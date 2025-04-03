import React, { useEffect, useState, useRef } from "react";
import { View, Text, Animated, Dimensions, Image, ImageBackground, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import { useRouter } from "expo-router";
import logo from "../../assets/images/logo-circle.png";
import background from "../../assets/images/new-background.jpg";

const { width } = Dimensions.get("window");
const BUBBLE_SIZE = width * 0.5;

const BreathingBubbleScreen = () => {
  const [breathPhase, setBreathPhase] = useState("Inhale");
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const ringSizeAnim = useRef(new Animated.Value(BUBBLE_SIZE + 20)).current;
  const rotationAnim = useRef(new Animated.Value(0)).current;
  const soundRef = useRef(null); // UseRef for sound
  const router = useRouter();

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

      Animated.timing(rotationAnim, {
        toValue: breathPhase === "Inhale" ? 360 : -360,
        duration: 4000,
        useNativeDriver: true,
      }).start(() => {
        rotationAnim.setValue(0);
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [breathPhase]);

  useEffect(() => {
    async function playSound() {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/audio/breathing-bubble.mp3"),
        { isLooping: true }
      );
      soundRef.current = sound; // Store sound in useRef
      await sound.playAsync();
    }

    playSound();

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  const handleBackPress = async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
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

        <View style={styles.instructionContainer}>
          <Text style={styles.title}>Breathing Bubbles</Text>
          <Text style={styles.instructionText}>
            Follow along by breathing in as the bubble shrinks and breathing out as it expands. 
            This helps reduce stress, improve focus, and promote relaxation.
          </Text>
        </View>

        <View style={styles.bubbleContainer}>
          <Animated.View
            style={[
              styles.rotatingRing,
              {
                transform: [{ rotate: rotationAnim.interpolate({
                  inputRange: [-360, 360],
                  outputRange: ["-360deg", "360deg"]
                }) }],
              },
            ]}
          >
            <View style={styles.marker} />
          </Animated.View>
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
  title:{
    color: "black",
    fontSize: 30,
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 20
  },
  instructionContainer: {
    marginHorizontal: 20,
    
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
  },
  instructionText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "300",
  },
  bubbleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  rotatingRing: {
    position: "absolute",
    width: BUBBLE_SIZE + 60,
    height: BUBBLE_SIZE + 60,
    borderRadius: (BUBBLE_SIZE + 60) / 2,
    borderWidth: 3,
    borderColor: "#00f",
    opacity: 0.8,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  marker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "blue",
    position: "absolute",
    top: -15,
  },
  text: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },
};

export default BreathingBubbleScreen;
