import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";
import { io } from "socket.io-client";
import { FontAwesome } from "@expo/vector-icons";
import logo from "../../assets/images/logo-circle.png";
import botAvatar from "../../assets/images/logo-circle.png";  // Bot's profile picture
import userAvatar from "../../assets/icons/profile.png"; // User's profile picture

const socket = io("ws://your-websocket-server-url"); // Replace with your WebSocket server URL

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    if (input.trim().length === 0) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const userMessage = { 
      text: input, 
      sender: "user", 
      timestamp, 
      avatar: userAvatar 
    };

    setMessages((prev) => [...prev, userMessage]);
    socket.emit("message", userMessage);
    setInput("");

    // Set a timeout to check if the bot responds
    const botResponseTimeout = setTimeout(() => {
      const botResponse = {
        text: "I'm currently unavailable. Please try again later.",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        avatar: botAvatar,
      };

      setMessages((prev) => [...prev, botResponse]);
    }, 5000); // 5 seconds delay

    socket.on("message", (botMessage) => {
      clearTimeout(botResponseTimeout); // Clear timeout if bot responds
      setMessages((prev) => [...prev, botMessage]);
    });
  };

  const renderItem = ({ item }) => (
    <View style={[
        styles.messageContainer, 
        item.sender === "user" ? styles.userMessage : styles.botMessage
    ]}>
      {/* Show Avatar */}
      {item.sender === "bot" && (
        <Image source={botAvatar} style={styles.avatar} />
      )}
      <View style={[
    styles.messageBubble, 
    item.sender === "user" ? styles.userBubble : styles.botBubble
]}>
  <Text style={styles.messageText}>{item.text}</Text>
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
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
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
    padding: 12,
    borderRadius: 15,
    maxWidth: "75%",
    alignItems: "flex-end",
  },
  userBubble: {
    backgroundColor: "#38b6ff", // Blue for user messages
  },
  botBubble: {
    backgroundColor: "#D3D3D3", // Light grey for bot messages
  },
  
  messageText: { color: "black" },
  timestamp: { 
    fontSize: 10, 
    color: "#ccc", 
    marginTop: 4, 
    alignSelf: "flex-end" 
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  useravatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 5,
  },
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
  },
  sendButton: {
    padding: 12,
    borderRadius: 25,
    backgroundColor: "#007AFF",
  },
});

export default Home;
