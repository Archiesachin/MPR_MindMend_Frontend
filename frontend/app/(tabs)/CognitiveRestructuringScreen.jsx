import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
} from "react-native";
import background from "../../assets/images/new-background.jpg";
import logo from "../../assets/images/logo-circle.png";
import { useRouter } from "expo-router";

const thoughts = [
  { negative: "I always fail at everything.", positive: "I can learn from mistakes and improve." },
  { negative: "Nobody likes me.", positive: "I have people who care about me." },
  { negative: "I am not good enough.", positive: "I have strengths that make me valuable." },
  { negative: "I will never be happy.", positive: "Happiness comes in moments, and I can create more." },
  { negative: "I’m too weak to handle this.", positive: "I have overcome challenges before." },
  { negative: "Everything is hopeless.", positive: "Things can improve with time and effort." },
  { negative: "I don’t deserve good things.", positive: "I am just as deserving of happiness as anyone else." },
  { negative: "People will leave me if I make mistakes.", positive: "True friends accept me even with mistakes." },
  { negative: "I have no control over my life.", positive: "I can control my actions and decisions." },
  { negative: "If I fail, everyone will judge me.", positive: "Failure is a step toward learning and growth." },
  { negative: "I’ll never achieve my goals.", positive: "With persistence and effort, I can succeed." },
  { negative: "I am not smart enough.", positive: "I am capable of learning and growing." },
  { negative: "I’m unlovable.", positive: "I am worthy of love and respect." },
  { negative: "Nothing ever works out for me.", positive: "Setbacks are part of progress, and I can try again." },
];

const getRandomThoughts = () => {
  return [...thoughts].sort(() => 0.5 - Math.random()).slice(0, 8);
};

const CognitiveRestructuringScreen = () => {
  const [gameThoughts, setGameThoughts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const router = useRouter();

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const selectedThoughts = getRandomThoughts();
    setGameThoughts(selectedThoughts);
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    generateOptions(selectedThoughts[0]);
  };

  const generateOptions = (currentThought) => {
    if (!currentThought) return;
    const correctAnswer = currentThought.positive;
    let wrongAnswers = thoughts
      .filter((t) => t.positive !== correctAnswer)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((t) => t.positive);

    const shuffledOptions = [...wrongAnswers, correctAnswer].sort(
      () => 0.5 - Math.random()
    );
    setOptions(shuffledOptions);
    setSelectedOption(null);
  };

  const handleChoice = (selectedOption) => {
    const correctAnswer = gameThoughts[currentIndex].positive;
    setSelectedOption(selectedOption);

    if (selectedOption === correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    setTimeout(() => {
      if (currentIndex < 7) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        generateOptions(gameThoughts[currentIndex + 1]);
      } else {
        Alert.alert("Great Job!", `You scored ${score + (selectedOption === correctAnswer ? 1 : 0)}/8!`);
      }
    }, 1000);
  };

  return (
    <ImageBackground source={background} style={styles.background} resizeMode="cover">
      <View style={styles.header}>
        <Image source={logo} resizeMode="contain" style={styles.icon} />
        <Text style={styles.appName}>MindMend</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push("/games")}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.gameTitle}>CBT Lingo</Text>
        <Text style={styles.gameDescription}>
          Train your mind to recognize and replace negative thoughts with positive ones.
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.score}>Score: {score}</Text>

        {currentIndex < 8 ? (
          <>
            <Text style={styles.negativeThought}>{gameThoughts[currentIndex]?.negative}</Text>
            <View style={styles.gridContainer}>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    selectedOption === option &&
                      (option === gameThoughts[currentIndex]?.positive
                        ? styles.correctOption
                        : styles.incorrectOption),
                  ]}
                  onPress={() => handleChoice(option)}
                  disabled={selectedOption !== null}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          <View style={styles.congratsContainer}>
            <Text style={styles.congratsText}>🎉 GREAT JOB! 🎉</Text>
            <TouchableOpacity style={styles.playAgainButton} onPress={startNewGame}>
              <Text style={styles.playAgainText}>Play Again</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, width: "100%", height: "100%" },
  header: { flexDirection: "row", alignItems: "center", padding: 10, justifyContent: "space-around" },
  icon: { height: 80, width: 60, marginRight: 10 },
  appName: { fontSize: 18, fontWeight: "bold", color: "#000", flex: 1 },
  backButton: { padding: 10 },
  backText: { fontSize: 15, color: "black" },
  titleContainer: { alignItems: "center", marginVertical: 20 },
  gameTitle: { fontSize: 24, fontWeight: "bold", color: "black", textAlign: "center" },
  gameDescription: { fontSize: 16, color: "black", textAlign: "center", paddingHorizontal: 20 },
  container: { flex: 1, padding: 20, alignItems: "center", justifyContent: "center" },
  score: { fontSize: 24, fontWeight: "bold", color: "black", marginBottom: 20 },
  negativeThought: { fontSize: 20, fontWeight: "bold", color: "#d9534f", textAlign: "center", marginBottom: 20 },
  gridContainer: { width: "90%", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  optionButton: { backgroundColor: "#D3D3D3", padding: 12, borderRadius: 10, marginVertical: 10, width: "48%", alignItems: "center" },
  optionText: { fontSize: 14, fontWeight: "bold", textAlign: "center" },
  correctOption: { backgroundColor: "#4CAF50" },
  incorrectOption: { backgroundColor: "#D9534F" },
});

export default CognitiveRestructuringScreen;
