import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  ImageBackground,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import logo from "../../assets/images/logo-circle.png";
import background from "../../assets/images/new-background.jpg";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const emotions = [
  "Happy",
  "Sad",
  "Angry",
  "Excited",
  "Worried",
  "Fearful",
  "Confident",
  "Shy",
  "Proud",
  "Confused",
  "Lonely",
  "Grateful",
  "Jealous",
  "Embarrassed",
  "Calm",
];

const emotionQuestions = {
  Happy: "What makes you feel happy?",
  Sad: "How do you handle sadness?",
  Angry: "What do you do when you feel angry?",
  Excited: "What excites you the most?",
  Worried: "What do you do when you're worried?",
  Fearful: "What fears do you have?",
  Confident: "When do you feel the most confident?",
  Shy: "How do you handle shyness?",
  Proud: "What achievement makes you feel proud?",
  Confused: "How do you deal with confusion?",
  Lonely: "What do you do when you feel lonely?",
  Grateful: "What are you grateful for today?",
  Jealous: "How do you cope with jealousy?",
  Embarrassed: "What is an embarrassing moment you've had?",
  Calm: "What helps you stay calm?",
};

const Feelopoly = () => {
  const [position, setPosition] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState("");
  const [answer, setAnswer] = useState("");
  const [responses, setResponses] = useState([]);

  const rollDice = () => {
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    let newPosition = position + diceRoll;
    if (newPosition >= emotions.length) {
      newPosition = newPosition % emotions.length;
    }
    setPosition(newPosition);
    setCurrentEmotion(emotions[newPosition]);
    setAnswer("");
    setModalVisible(true);
  };

  const handleSubmitAnswer = () => {
    if (answer.trim() !== "") {
      setResponses([
        ...responses,
        { emotion: currentEmotion, response: answer },
      ]);
    }
    setModalVisible(false);
  };

  const router = useRouter();

  return (
    <ImageBackground
      source={background}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image source={logo} resizeMode="contain" style={styles.icon} />
          <Text style={styles.appName}>MindMend</Text>
          <TouchableOpacity onPress={() => router.push("/games")}>
            <Text style={styles.back}>Back</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.gametitle}>Feelopoly</Text>
        <View style={styles.tilesContainer}>
        <FlatList
          data={emotions}
          keyExtractor={(item, index) => index.toString()}
          numColumns={4}
          contentContainerStyle={styles.tilesWrapper}
          renderItem={({ item, index }) => (
            <View style={[styles.tile, position === index && styles.playerTile]}>
              <Text style={styles.tileText}>{item}</Text>
            </View>
          )}
        />
      </View>

        <TouchableOpacity style={styles.diceButton} onPress={rollDice}>
          <Text style={styles.diceText}>🎲 Roll Dice</Text>
        </TouchableOpacity>

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeader}>You landed on:</Text>
              <Text style={styles.modalEmotion}>{currentEmotion}</Text>
              <Text style={styles.modalQuestion}>
                {emotionQuestions[currentEmotion]}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Type your answer here..."
                value={answer}
                onChangeText={setAnswer}
              />
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmitAnswer}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.responsesContainer}>
          {responses.map((item, index) => (
            <View key={index} style={styles.responseBox}>
              <Text style={styles.responseText}>
                <Text style={styles.boldText}>Q:</Text>{" "}
                {emotionQuestions[item.emotion]}
              </Text>
              <Text style={styles.responseText}>
                <Text style={styles.boldText}>A:</Text> {item.response}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  scrollContainer: { flexGrow: 1, paddingBottom: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  icon: { height: 60, width: 50 },
  appName: { fontSize: 18, fontWeight: "bold", color: "#000" },
  back: { color: "black" },
  gametitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  tilesContainer: { 
    alignItems: "center", 
    justifyContent: "center", 
    flex: 1 
  },
  tilesWrapper: { 
    justifyContent: "center", 
    alignItems: "center" },
  tile: {
    width: width * 0.2,
    height: width * 0.2,
    margin: 5,
    backgroundColor: "#87CEEB",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  playerTile: { backgroundColor: "#FFD700" },
  tileText: { fontWeight: "bold", textAlign: "center" },
  diceButton: {
    backgroundColor: "#FF4500",
    padding: 15,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    width: width * 0.8,
    alignItems: "center",
  },
  input: { borderWidth: 1, padding: 10, width: "100%", marginVertical: 10 },
  responsesContainer: { padding: 10 },
  responseBox: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  submitButton: { backgroundColor: "#38b6ff", padding: 10, borderRadius: 10 },
});

export default Feelopoly;
