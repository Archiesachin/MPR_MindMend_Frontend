import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import background from "../../assets/images/new-background.jpg";
import logo from "../../assets/images/logo-circle.png"; // Add your logo image path
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { API_URL } from "../context/AuthContext";

const tasksHistoryScreen = () => {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        const { data } = await axios.get(`${API_URL}/api/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(data.tasks); // Store tasks in state
      } catch (error) {
        console.log("Error fetching tasks:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <ImageBackground
      source={background}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Header Section */}
      <View style={styles.header}>
        <Image source={logo} resizeMode="contain" style={styles.icon} />
        <Text style={styles.appName}>MindMend</Text>
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={() => router.push("/tasks")}
        >
          <Text style={styles.back}>Back</Text>
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <ScrollView style={styles.taskList}>
        {tasks.filter((task) => task.completed == false).length > 0 ? (
          tasks
            .filter((task) => task.completed == false) // Filter only completed tasks
            .map((task, index) => (
              <View key={index} style={styles.taskItem}>
                <View style={styles.taskCard}>
                  <Text style={styles.taskText}>{task.description}</Text>
                  <Text style={styles.taskDesc}>Feedback</Text>
                </View>
              </View>
            ))
        ) : (
          <Text style={styles.noTasks}>No completed tasks available</Text>
        )}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent: "space-around",
  },
  icon: {
    marginLeft: 10,
    height: 80,
    width: 60,
    marginRight: 10,
  },
  appName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    flex: 1,
  },
  back: {
    fontSize: 15,
  },
  taskContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  taskCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  taskText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  taskDesc: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
  },
  taskDate: {
    fontSize: 12,
    color: "#777",
    marginTop: 5,
  },
  noTasks: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});

export default tasksHistoryScreen;
