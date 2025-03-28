import React, { useEffect, useState, useRef } from "react";
import { View, Text, Animated, Dimensions, Image, ImageBackground, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import logo from "../../assets/images/logo-circle.png"; // Adjust the path as needed
import background from "../../assets/images/new-background.jpg";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");
const BUBBLE_SIZE = width * 0.5;

const BreathingBubbleScreen = () => {
  const [breathPhase, setBreathPhase] = useState("Inhale");
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const ringSizeAnim = useRef(new Animated.Value(BUBBLE_SIZE + 20)).current;
  const [sound, setSound] = useState(null);

  useEffect(() => {
    let interval = setInterval(() => {
      setBreathPhase((prev) => (prev === "Inhale" ? "Exhale" : "Inhale"));

      Animated.timing(scaleAnim, {
        toValue: breathPhase === "Inhale" ? 1.2 : 1,
        duration: 4000,
        useNativeDriver: true,
      }).start();

      Animated.timing(ringSizeAnim, {
        toValue: breathPhase === "Inhale" ? BUBBLE_SIZE + 40 : BUBBLE_SIZE + 20,
        duration: 4000,
        useNativeDriver: false,
      }).start();
    }, 4000);

    return () => clearInterval(interval);
  }, [breathPhase]);

  useEffect(() => {
    async function playSound() {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/audio/breathing-bubble.mp3"), // Replace with your own audio file
        { isLooping: true }
      );
      setSound(sound);
      await sound.playAsync();
    }

    playSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const router = useRouter();

  const handleBackPress = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
    }
    router.push("/games");
  };

  return (
    <ImageBackground source={background} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={logo} resizeMode="contain" style={styles.icon} />
          <Text style={styles.appName}>MindMend</Text>
          <TouchableOpacity style={{ marginRight: 10 }} onPress={handleBackPress}>
            <Text style={styles.back}>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bubbleContainer}>
          <Animated.View
            style={[
              styles.ring,
              {
                width: ringSizeAnim,
                height: ringSizeAnim,
              },
            ]}
          />
          <Animated.View style={[styles.bubble, { transform: [{ scale: scaleAnim }] }]}>
            <Text style={styles.text}>{breathPhase}</Text>
          </Animated.View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = {
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
  bubbleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center", // Ensures the bubble is centered vertically and horizontally
  },
  bubble: {
    width: BUBBLE_SIZE,
    height: BUBBLE_SIZE,
    borderRadius: BUBBLE_SIZE / 2,
    backgroundColor: "#61dafb",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    shadowColor: "#00f",
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  ring: {
    position: "absolute",
    borderWidth: 5,
    borderColor: "#fff",
    borderRadius: BUBBLE_SIZE,
    opacity: 0.5,
  },
  text: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },
};

export default BreathingBubbleScreen;
