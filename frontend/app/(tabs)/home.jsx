import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
import { io } from "socket.io-client";
import { FontAwesome } from "@expo/vector-icons";
import {
  API_URL,
  ASSEMBLY_API_KEY,
  ASSEMBLY_API_SECRET,
  GROQ_API_KEY,
} from "../context/AuthContext";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { Audio } from "expo-av";
import logo from "../../assets/images/logo-circle.png";
import botAvatar from "../../assets/images/logo-circle.png";
import userAvatar from "../../assets/images/profile.png";
import background from "../../assets/images/new-background.jpg";
import RBSheet from "react-native-raw-bottom-sheet";

const socket = io(API_URL);

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const sheet = useRef(null);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        if (!token) {
          router.push("/sign-in");
        } else {
          const { data } = await axios.get(`${API_URL}/api/conversations`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("Fetched Messages:", data.conversation);
          setMessages(data.conversation);
        }
      } catch (error) {
        console.log("Error fetching messages:", error);
      }
    };
    getMessages();
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      const newMessage = {
        sender: "ai",
        content: data.content,
        timestamp: data.timestamp,
        type: data.type || "text",
      };

      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  // React Native code for transcribing audio with AssemblyAI using HTTP requests

  // Step 1: Upload the audio file
  const uploadAudio = async (audioUri) => {
    try {
      // Get the audio file
      const audioFile = await fetch(audioUri);
      const audioBlob = await audioFile.blob();

      // Upload to AssemblyAI
      const uploadResponse = await fetch(
        "https://api.assemblyai.com/v2/upload",
        {
          method: "POST",
          headers: {
            authorization: ASSEMBLY_API_SECRET,
            "content-type": "application/octet-stream",
          },
          body: audioBlob,
        }
      );

      const uploadResult = await uploadResponse.json();
      return uploadResult.upload_url;
    } catch (error) {
      console.error("Error uploading audio:", error);
      throw error;
    }
  };

  // Step 2: Submit the transcription request
  const submitTranscriptionRequest = async (audioUrl) => {
    try {
      const response = await fetch("https://api.assemblyai.com/v2/transcript", {
        method: "POST",
        headers: {
          authorization: ASSEMBLY_API_SECRET,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          audio_url: audioUrl,
          // Add any other parameters as needed
          // speaker_labels: true,
          // language_code: 'en',
        }),
      });

      const result = await response.json();
      return result.id; // Return the transcript ID
    } catch (error) {
      console.error("Error submitting transcription request:", error);
      throw error;
    }
  };

  // Step 3: Poll for the transcription result
  const getTranscriptionResult = async (transcriptId) => {
    try {
      const pollingEndpoint = `https://api.assemblyai.com/v2/transcript/${transcriptId}`;

      while (true) {
        const response = await fetch(pollingEndpoint, {
          method: "GET",
          headers: {
            authorization: ASSEMBLY_API_SECRET,
            "content-type": "application/json",
          },
        });

        const result = await response.json();

        if (result.status === "completed") {
          return result;
        } else if (result.status === "error") {
          throw new Error(`Transcription failed: ${result.error}`);
        } else {
          // Wait for 3 seconds before polling again
          await new Promise((resolve) => setTimeout(resolve, 3000));
        }
      }
    } catch (error) {
      console.error("Error getting transcription result:", error);
      throw error;
    }
  };

  // Example usage in a React Native component
  const transcribeAudio = async (audioUri) => {
    try {
      // Step 1: Upload the audio file
      const uploadUrl = await uploadAudio(audioUri);

      // Step 2: Submit the transcription request
      const transcriptId = await submitTranscriptionRequest(uploadUrl);

      // Step 3: Poll for the transcription result
      const transcriptionResult = await getTranscriptionResult(transcriptId);

      console.log("Transcription:", transcriptionResult.text);
      return transcriptionResult.text;
    } catch (error) {
      console.error("Transcription process failed:", error);
      throw error;
    }
  };

  const sendMessage = async () => {
    if (input.trim().length === 0) return;

    const timestamp = new Date().toISOString();
    const userId = await SecureStore.getItemAsync("userId");

    const userMessage = {
      content: input,
      sender: "user",
      timestamp,
      type: "text",
    };

    setMessages((prev) => [...prev, userMessage]);
    socket.emit("send_message", { userMessage, userId });
    setInput("");
  };

  const startRecording = async () => {
    try {
      setIsRecording(true);
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) return;

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (error) {
      console.log("Error starting recording:", error);
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    if (!recording) return;

    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    if (!uri) {
      console.error("Audio URI is undefined.");
      return;
    }

    setRecording(null);

    // Send audio for transcription
    const transcription = await transcribeAudio(uri);
    console.log("Transcription:", transcription);

    if (transcription) {
      const timestamp = new Date().toISOString();
      const userMessage = {
        sender: "user",
        content: transcription,
        uri,
        timestamp,
        type: "audio",
      };

      const userId = await SecureStore.getItemAsync("userId");

      setMessages((prev) => [...prev, userMessage]);
      socket.emit("send_message", { userMessage, userId });
    }
  };

  const playAudio = async (uri) => {
    if (!uri) {
      console.error("Audio URI is undefined.");
      return;
    }
    const { sound } = await Audio.Sound.createAsync({ uri });
    await sound.playAsync();
  };

  return (
    <ImageBackground
      source={background}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.chatContainer}>
          {messages.map((item, index) => {
            console.log("Received message:", item);
            return (
              <View
                key={index}
                style={[
                  styles.messageContainer,
                  item.sender === "user"
                    ? styles.userMessage
                    : styles.botMessage,
                ]}
              >
                {item.sender === "ai" && (
                  <Image source={botAvatar} style={styles.avatar} />
                )}

                <View
                  style={[
                    styles.messageBubble,
                    item.sender === "user"
                      ? styles.userBubble
                      : styles.botBubble,
                  ]}
                >
                  {item.type === "text" ? (
                    <Text style={styles.messageText}>{item.content}</Text>
                  ) : (
                    <TouchableOpacity onPress={() => playAudio(item.uri)}>
                      <FontAwesome
                        name="play-circle"
                        size={24}
                        color="#38b6ff"
                      />
                      <Text style={styles.audioText}>Voice Note</Text>
                    </TouchableOpacity>
                  )}
                  <Text style={styles.timestamp}>{item.timestamp}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity
            style={styles.voiceButton}
            onPress={isRecording ? stopRecording : startRecording}
          >
            <FontAwesome
              name={isRecording ? "stop" : "microphone"}
              size={18}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <FontAwesome name="paper-plane" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = {
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },

  chatContainer: {
    padding: 10,
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent: "space-around",
  },
  icon: { marginLeft: 10, height: 80, width: 60, marginRight: 10 },
  appName: { fontSize: 18, fontWeight: "bold", color: "#000", flex: 1 },
  messageContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 8,
    maxWidth: "80%",
  },
  userMessage: {
    alignSelf: "flex-end",
    justifyContent: "flex-end",
  },
  botMessage: {
    alignSelf: "flex-start",
    justifyContent: "flex-start",
  },

  messageBubble: {
    padding: 14,
    borderRadius: 18,
    maxWidth: "85%",
    minWidth: "15%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },

  // USER MESSAGE (Blue gradient bubble)
  userBubble: {
    backgroundColor: "#b5e2fa",
    alignSelf: "flex-end",
    borderTopRightRadius: 2,
  },
  userText: {
    color: "#fff",
    fontSize: 16,
  },

  // AI MESSAGE (Gray gradient bubble)
  botBubble: {
    backgroundColor: "#f4f4f4",
    alignSelf: "flex-start",
    borderTopLeftRadius: 2,
  },
  botText: {
    color: "#333",
    fontSize: 16,
  },

  timestamp: {
    fontSize: 10,
    color: "#888",
    marginTop: 4,
    alignSelf: "flex-end",
  },

  // AVATARS
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  useravatar: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginHorizontal: 8,
    borderWidth: 0.5,
    marginBottom: 30,
  },

  inputContainer: { flexDirection: "row", alignItems: "center", padding: 10 },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  sendButton: {
    padding: 12,
    borderRadius: 20,
    backgroundColor: "#38b6ff",
    marginLeft: 8,
  },
  voiceButton: {
    padding: 12,
    borderRadius: 20,
    backgroundColor: "#ff5252",
    marginLeft: 8,
  },
  audioText: { color: "#38b6ff", marginTop: 4, textAlign: "center" },
};

export default Home;
