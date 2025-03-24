import React, { useState, useEffect, useContext, use } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground
} from "react-native";
import { io } from "socket.io-client";
import { FontAwesome } from "@expo/vector-icons";
import logo from "../../assets/images/logo-circle.png";
import botAvatar from "../../assets/images/logo-circle.png"; // Bot's profile picture
import userAvatar from "../../assets/images/profile.png"; // User's profile picture
import { API_URL } from "../context/AuthContext";
// import AuthContext from "../context/AuthContext";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import background from '../../assets/images/new-background.jpg'

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
  }, []);

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

    const timestamp = new Date().toISOString();

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
    <ImageBackground
    source={background} // Update the path as per your folder structure
      style={styles.background}
      resizeMode="cover" >
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} resizeMode="contain" style={styles.icon} />
        <Text style={styles.appName}>Chat with AI</Text>
        <TouchableOpacity style={{ marginRight: 10 }}>
        <FontAwesome name="ellipsis-v" size={24} color="black"  />
      </TouchableOpacity>
      </View>

      {/* Chat Messages */}
      <ScrollView contentContainerStyle={styles.chatContainer}>
        {messages.map((item, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              item.sender === "user" ? styles.userMessage : styles.botMessage,
            ]}
          >
            {/* Show Bot Avatar */}
            {item.sender === "ai" && (
              <Image source={botAvatar} style={styles.avatar} />
            )}

            {/* Message Bubble */}
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
              <Image source={userAvatar} style={styles.useravatar} resizeMode="contain"/>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Input Field */}
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Optional: Semi-transparent overlay
  },
  
  chatContainer: { padding: 10, marginTop: 20 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent:'space-around'
  },
  icon: { marginLeft: 10, height: 80, width: 60, marginRight: 10 },
  appName: { fontSize: 18, fontWeight: "bold", color: "#000", flex: 1 },

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
    borderWidth:0.5,
    marginBottom: 30
  },

  // INPUT FIELD
  inputContainer: {
    flexDirection: "row",
    padding: 10,
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
    borderColor:'#d9d9d9',
    borderWidth: 0.5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  sendButton: {
    padding: 12,
    borderRadius: 25,
    backgroundColor: "#38b6ff",
  },
});

export default Home;
