import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";
import logo from "../../assets/images/logo-circle.png";
import background from "../../assets/images/new-background.jpg";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "../context/AuthContext"; // Adjust the import path as needed

const questions = [
  "The idea that someone else controls your thoughts",
  "Feeling that others are to blame for most of your troubles",
  "Worry about sloppiness and carelessness",
  "Poor appetite",
  "Feelings of being trapped or caught",
  "Suddenly frightened for no reason",
  "Temper outbursts that cannot be controlled",
  "Pain in lower back",
  "Feeling fearful",
  "Other people being aware of your private thoughts",
  "Feeling that people are unfriendly or dislike you",
  "Having to do things very slowly to ensure correctness",
  "Heart pounding and racing",
  "Nausea or upset stomach",
  "Feeling inferior to others",
  "Feeling that you are being watched or talked about by others",
  "Hot or cold spells",
  "Having to avoid certain things because they frighten you",
  "Your mind going blank",
  "Feeling weakness in parts of your body",
  "Heavy feeling in your arms or legs",
  "Thoughts of death or dying",
  "Having the urge to break or smash things",
  "Feeling uneasy in crowds",
  "Spells of terror and panic",
  "Getting into frequent arguments",
  "Feeling so restless that you cannot sit still",
  "Feeling like something bad is going to happen to you",
];

const disorders = {
  Depression: [2, 4, 5, 15, 22, 23, 27],
  Anxiety: [3, 6, 9, 12, 13, 14, 20, 21, 22, 24, 25, 27, 28],
  Psychoticism: [1, 5, 6, 7, 9, 10, 16, 19, 25, 28],
  Paranoia: [2, 5, 6, 9, 16, 18, 24, 28],
  Hostility: [2, 7, 11, 13, 23, 26],
  "Obsessive-Compulsive": [3, 12, 19],
  Somatization: [3, 8, 14, 17, 19, 20, 21, 28],
  "Interpersonal Sensitivity": [2, 11, 13, 15],
  "Phobic Anxiety": [9, 18, 24, 25],
  "Additional Items": [4, 22],
};

const QuizScreen = () => {
  const [responses, setResponses] = useState(Array(questions.length).fill(0));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [topDisorders, setTopDisorders] = useState([]);

  const handleSelect = (value) => {
    const newResponses = [...responses];
    newResponses[currentQuestion] = value;
    setResponses(newResponses);

    // Briefly highlight the selected option before moving to the next question
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        getTopDisorders();
      }
    }, 300); // 300ms delay to show the selected color
  };

  const calculateScores = () => {
    let disorderScores = {};
    for (let disorder in disorders) {
      disorderScores[disorder] = disorders[disorder].reduce(
        (sum, qIndex) => sum + responses[qIndex - 1],
        0
      );
    }
    return disorderScores;
  };

  const getTopDisorders = () => {
    const scores = calculateScores();
    console.log("Scores:", scores); // Log the scores for debugging
    // Get the top 2 disorders based on scores
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    console.log("Sorted Disorders:", sorted); // Log the sorted disorders

    let top = [];
    for (let i = 0; i < Math.min(2, sorted.length); i++) {
      top.push({
        disorder: sorted[i][0],
        score: sorted[i][1],
      });
    }

    console.log("Top Disorders:", top); // Log the top disorders
    

    setTopDisorders(top);
    setModalVisible(true);
  };

  const handleDisorder = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      const response = await axios.put(
        `${API_URL}/api/user`,
        {
          disorder: topDisorders,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Disorder data sent successfully:", response.data);
      }
    } catch (error) {
      console.error("Error fetching disorder data:", error);
    } finally {
      setModalVisible(false);
    }
  };

  const router = useRouter();

  return (
    <ImageBackground
      source={background}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={logo} resizeMode="contain" style={styles.icon} />
          <Text style={styles.appName}>MindMend</Text>
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => router.push("/profile")}
          >
            <Text style={styles.back}>Back</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Mental Health Quiz</Text>
          <Text style={styles.desc}>
            A self-report questionnaire designed to evaluate the severity of
            depression by providing a quantitative measure of depressive
            symptoms.
          </Text>
          <Text style={styles.desc}>
            For each question, select one option from a scale of 0 to 4 based on
            how much you agree with the statement, with 0 indicating no
            agreement and 4 indicating strong agreement.
          </Text>

          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{`${currentQuestion + 1}. ${
              questions[currentQuestion]
            }`}</Text>

            <View style={styles.optionsContainer}>
              {[0, 1, 2, 3, 4].map((value) => (
                <TouchableOpacity
                  key={value}
                  style={[
                    styles.optionButton,
                    responses[currentQuestion] === value &&
                      styles.selectedOption,
                  ]}
                  onPress={() => handleSelect(value)}
                >
                  <Text style={styles.optionText}>{value}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Results Modal */}
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Your Top Disorders:</Text>
              {topDisorders.map((item, idx) => (
                <Text key={idx} style={styles.modalText}>
                  {item.disorder}: {item.score}
                </Text>
              ))}
              <Button title="Close" onPress={handleDisorder} />
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
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
  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  desc: {
    paddingBottom: 20,
  },
  questionContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  optionButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
  },
  selectedOption: {
    backgroundColor: "#b5e2fa", // Green color to indicate selection
    transform: [{ scale: 1.1 }], // Slightly enlarge the selected option
  },

  optionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 5,
  },
  modalText: {
    fontSize: 16,
    padding: 5,
    marginBottom: 10,
  },
});
