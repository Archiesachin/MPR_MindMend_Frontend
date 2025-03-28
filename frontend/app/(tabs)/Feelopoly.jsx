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
  ScrollView
} from "react-native";
import logo from "../../assets/images/logo-circle.png";
import background from "../../assets/images/new-background.jpg";
import { useRouter } from "expo-router";

const emotions = [
  "Happy", "Sad", "Angry", "Excited", "Worried",
  "Fearful", "Confident", "Shy", "Proud", "Confused",
  "Lonely", "Grateful", "Jealous", "Embarrassed", "Calm"
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
      setResponses([...responses, { emotion: currentEmotion, response: answer }]);
    }
    setModalVisible(false);
  };

  const router = useRouter();

  return (
    <ImageBackground source={background} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={logo} resizeMode="contain" style={styles.icon} />
          <Text style={styles.appName}>MindMend</Text>
           <TouchableOpacity style={{ marginRight: 10 }} onPress={() => router.push('/games')}>
                                        <Text style={styles.back}>Back</Text>
                                      </TouchableOpacity>
        </View>

        <View style={styles.gameContainer}>
          <Text style={styles.gametitle}>Feelopoly</Text>
          <FlatList
            data={emotions}
            keyExtractor={(item, index) => index.toString()}
            numColumns={5}
            renderItem={({ item, index }) => (
              <View style={[styles.tile, position === index && styles.playerTile]}>
                <Text style={styles.tileText}>{item}</Text>
              </View>
            )}
          />

          <TouchableOpacity style={styles.diceButton} onPress={rollDice}>
            <Text style={styles.diceText}>🎲 Roll Dice</Text>
          </TouchableOpacity>

          {/* Modal for Answer Input */}
          <Modal animationType="slide" transparent={true} visible={modalVisible}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalHeader}>You landed on:</Text>
                <Text style={styles.modalEmotion}>{currentEmotion}</Text>
                <Text style={styles.modalQuestion}>{emotionQuestions[currentEmotion]}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Type your answer here..."
                  value={answer}
                  onChangeText={setAnswer}
                />
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmitAnswer}>
                  <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Response List with ScrollView Fix */}
          <ScrollView 
            style={styles.responsesContainer} 
            contentContainerStyle={{ flexGrow: 1 }}
          >
            {responses.map((item, index) => (
              <View key={index} style={styles.responseBox}>
                <Text style={styles.responseText}>
                  <Text style={styles.boldText}>Question:</Text> {emotionQuestions[item.emotion]}
                </Text>
                <Text style={styles.responseText}>
                  <Text style={styles.boldText}>Answer:</Text> {item.response}
                </Text>
              </View>
            ))}
          </ScrollView>
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
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent: "space-between",
  },
  icon: { height: 80, width: 60 },
  appName: { fontSize: 18, fontWeight: "bold", color: "#000" },
 
  back: { color: "black"},
  gameContainer: {
    padding: 20,
    alignItems: "center",
  },
  gametitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  tile: {
    width: 70,
    height: 70,
    margin: 5,
    backgroundColor: "#87CEEB",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  playerTile: {
    backgroundColor: "#FFD700",
  },
  tileText: {
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
  },
  diceButton: {
    backgroundColor: "#FF4500",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  diceText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
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
    width: 320,
    alignItems: "center",
  },
  modalEmotion:{
    fontWeight:'bold',
    marginBottom: 5
  },
  input: {
    borderWidth: 1,
    padding: 10,
    width: "100%",
    marginVertical: 10,
  },
  responsesContainer: {
    marginTop: 20,
    maxHeight: 200,
  },
  responseBox: {
    backgroundColor: "#FFF",
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  boldText: { fontWeight: "bold" },
  submitButton: {
    backgroundColor: "#38b6ff",
    padding: 10,
    borderRadius: 10,
  },
  submitButtonText: { color: "#FFF", fontWeight: "bold" },
});

export default Feelopoly;
