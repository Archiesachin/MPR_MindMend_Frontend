import React, { useState, useEffect, useContext, use } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import { io } from "socket.io-client";
import { FontAwesome } from "@expo/vector-icons";
import logo from "../../assets/images/logo-circle.png";
import botAvatar from "../../assets/images/logo-circle.png"; // Bot's profile picture
import userAvatar from "../../assets/icons/profile.png"; // User's profile picture
import { API_URL } from "../context/AuthContext";
// import AuthContext from "../context/AuthContext";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

const socket = io(API_URL); // Replace with your WebSocket server URL

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const getMessages = async () => {
      try {
        const userId = await SecureStore.getItemAsync("userId");
        if (!userId) {
          router.push("/sign-in");
        } else {
          const { data } = await axios.get(
            `${API_URL}/api/conversations/${userId}`
          );
          setMessages(data.conversation);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [messages]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      const newMessage = {
        sender: "ai",
        content: data.content, // ✅ Fix: Use correct key
        timestamp: data.timestamp,
      };

      setMessages((prev) => [...prev, newMessage]);
      console.log(data);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const sendMessage = async () => {
    if (input.trim().length === 0) return;

    const timestamp = new Date().toUTCString();

    const userId = await SecureStore.getItemAsync("userId");

    const userMessage = {
      //change the userMessage object structure, should only send string message and _id? maybe
      content: input,
      sender: "user",
      timestamp: timestamp,
    };

    setMessages((prev) => [...prev, userMessage]);
    socket.emit("send_message", { userMessage: userMessage, userId: userId });
    console.log("message sent");
    console.log(messages);
    setInput("");
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "user" ? styles.userMessage : styles.botMessage,
      ]}
    >
      {/* Show Avatar */}
      {item.sender === "ai" && (
        <Image source={botAvatar} style={styles.avatar} />
      )}
      <View
        style={[
          styles.messageBubble,
          item.sender === "user" ? styles.userBubble : styles.botBubble,
        ]}
      >
        <Text style={styles.messageText}>{item.content}</Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>

      {/* Show User Avatar */}
      {item.sender === "user" && (
        <Image source={userAvatar} style={styles.useravatar} />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} resizeMode="contain" style={styles.icon} />
        <Text style={styles.appName}>MindMend</Text>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.chatContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#888"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <FontAwesome name="paper-plane" size={18} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  chatContainer: { padding: 10, marginTop: 20 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#38b6ff",
  },
  icon: { marginLeft: 10, height: 70, width: 50, marginRight: 10 },
  appName: { fontSize: 18, fontWeight: "bold", color: "#fff", flex: 1 },

  // MESSAGE CONTAINER
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

  // MESSAGE BUBBLE
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
    backgroundColor: "#007AFF",
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
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 8,
  },

  // INPUT FIELD
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#1C1C1E",
    borderTopWidth: 1,
    borderColor: "#333",
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: 12,
    borderRadius: 25,
    backgroundColor: "#fff",
    color: "#000",
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    padding: 12,
    borderRadius: 25,
    backgroundColor: "#007AFF",
  },
});

export default Home;
