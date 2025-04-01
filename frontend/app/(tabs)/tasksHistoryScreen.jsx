import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
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
  const [expandedTasks, setExpandedTasks] = useState({});
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
        console.log("Tasks data:", data.tasks);

        setTasks(data.tasks); // Store tasks in state
      } catch (error) {
        console.log("Error fetching tasks:", error);
      }
    };
    fetchData();
  }, []);

  const toggleExpand = (taskId) => {
    setExpandedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  return (
    <ImageBackground
      source={background}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Header */}
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
      {tasks.length > 0 ? (
        <FlatList
          data={tasks}
          keyExtractor={(task) => task._id}
          contentContainerStyle={styles.taskList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.taskItem}
              onPress={() => toggleExpand(item._id)}
              activeOpacity={0.8}
            >
              <View style={styles.taskCard}>
                <Text style={styles.taskText}>
                  {expandedTasks[item._id]
                    ? item.description
                    : `${item.description.substring(0, 70)}...`}
                </Text>
                {expandedTasks[item._id] && (
                  <View>
                    <Text style={styles.feedback}>User Feedback:</Text>
                    <Text style={styles.taskDesc}>{item.feedback}</Text>
                  </View>
                )}
                <Text style={styles.expandText}>{expandedTasks[item._id]}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.noTasks}>No completed tasks available</Text>
      )}
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
    color: "#333",
  },
  taskDesc: {
    fontSize: 16,
    color: "#000",
    fontWeight: 600,
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
  feedback: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 30,
  },
});

export default tasksHistoryScreen;
