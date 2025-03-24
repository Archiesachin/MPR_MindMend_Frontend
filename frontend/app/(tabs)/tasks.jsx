import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground } from "react-native";
import React, { useState } from "react";
import logo from "../../assets/images/logo-circle.png"; // Adjust the path if needed
import background from "../../assets/images/new-background.jpg";
import { FontAwesome } from "@expo/vector-icons";
import CustomSlider from "../../components/CustomSlider"; // Import the custom slider
import { useRouter } from "expo-router";
import { API_URL } from "../context/AuthContext";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const Tasks = () => {
  const [feedback, setFeedback] = useState("");
  const [summary, setSummary] = useState("");
  const [tasks, setTasks] = useState([]);

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
  const [moodScore, setMoodScore] = useState(3); // Hardcoded initial value

  const handleSubmit = () => {
    if (feedback.trim().length === 0) return;
    setSummary(`Summary: ${feedback.substring(0, 50)}...`); // Example: Show first 50 chars
    setFeedback(""); // Clear input field after submission
    setSummary(`Summary: ${feedback.substring(0, 50)}...`); // Example: Show first 50 chars
    setFeedback(""); // Clear input field after submission
  };

  const router = useRouter()

  return (
    <ImageBackground source={background} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Image source={logo} resizeMode="contain" style={styles.icon} />
          <Text style={styles.appName}>MindMend</Text>
          <TouchableOpacity style={{ marginRight: 10 }} onPress={() => router.push('/tasksHistoryScreen')}>
            <Text style={styles.back}>History</Text>
          </TouchableOpacity>
        </View>

      {/* Task Section */}
      <Text style={styles.taskTitle}>Today's Tasks</Text>
      
      <ScrollView style={styles.taskList}>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <View key={index} style={styles.taskItem}>
              <Text style={styles.taskText}>
                {task.completed ? "✅" : "⬜"} {task.description}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noTasks}>No tasks available</Text>
        )}
      </ScrollView>

        {/* Feedback Input */}
        <TextInput
          style={styles.input}
          placeholder="Enter your feedback..."
          value={feedback}
          onChangeText={setFeedback}
          multiline
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        {/* Feedback Summary */}
        {summary ? <Text style={styles.summary}>{summary}</Text> : null}

        <CustomSlider min={1} max={5} step={1} initialValue={3} onValueChange={setMoodScore} />
      </View>
    </ImageBackground>
  );
};

export default Tasks;

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
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  taskList: {
    maxHeight: 200, // Prevents overflow
    marginHorizontal: 20,
    marginBottom: 15,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  taskText: {
    fontSize: 16,
    color: "#555",
  },
  noTasks: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    minHeight: 60,
    textAlignVertical: "top",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#38b6ff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  summary: {
    marginTop: 20,
    fontSize: 14,
    color: "#333",
    fontStyle: "italic",
    marginHorizontal: 20,
  },
});
