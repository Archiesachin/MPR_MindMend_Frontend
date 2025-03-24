import { StyleSheet, Text, View, ScrollView, Image, ImageBackground, TouchableOpacity} from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import logo from '../../assets/images/logo-circle.png'; // Adjust the path as needed
import background from '../../assets/images/new-background.jpg'
import { FontAwesome } from "@expo/vector-icons";

const BreathingBubbles = () => (
  <Link href="/breathingBubbleGuide" style={styles.gameBox}>
     <View style={styles.textContainer}>
    <Text style={styles.gameTitle}>Breathing Bubbles</Text>
    <Text style={styles.gameDescription}>Practice mindfulness by focusing on the present moment.</Text>
    </View>
  </Link>
);

const MeditationGuide = () => (
  <Link href="/MeditationGuideScreen" style={styles.gameBox}>
     <View style={styles.textContainer}>
    <Text style={styles.gameTitle}>Meditation Guide</Text>
    <Text style={styles.gameDescription}>A guided meditation to help you relax and calm your mind.</Text>
    </View>
  </Link>
);

const MusicTherapy = () => (
  <Link href="/MusicTherapyScreen" style={styles.gameBox}>
     <View style={styles.textContainer}>
    <Text style={styles.gameTitle}>Music Therapy</Text>
    <Text style={styles.gameDescription}>Immerse yourself in soothing melodies designed to calm the mind, reduce stress, and promote emotional well-being.</Text>
    </View>
  </Link>
);

const CognitiveRestructuring = () => (
  <Link href="/CognitiveRestructuringScreen" style={styles.gameBox}>
    <View style={styles.textContainer}>
      <Text style={styles.gameTitle}>Cognitive Restructuring</Text>
      <Text style={styles.gameDescription}>
        Challenge negative thoughts and reframe them positively.
      </Text>
    </View>
  </Link>
);


const Games = () => {
  return (
     <ImageBackground
        source={background} // Update the path as per your folder structure
          style={styles.background}
          resizeMode="cover" >
    <View style={styles.container}>
      <View style={styles.header}>
              <Image source={logo} resizeMode="contain" style={styles.icon} />
              <Text style={styles.appName}>MindMend</Text>
              <TouchableOpacity style={{ marginRight: 10 }}>
              <FontAwesome name="ellipsis-v" size={24} color="black"  />
            </TouchableOpacity>
            </View>
      <ScrollView style={styles.gameList}>
        
        <BreathingBubbles />
        <MeditationGuide />
        <MusicTherapy />
        <CognitiveRestructuring />
      </ScrollView>
    </View>
    </ImageBackground>
  );
};

export default Games;

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
    justifyContent:'space-around'
  },
  icon: { 
    marginLeft: 10, 
    height: 80, 
    width: 60, 
    marginRight: 10 
  },

  appName: { 
    fontSize: 18, 
    fontWeight: "bold", 
    color: "#000", 
    flex: 1 
  },

  gameList: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  gameBox: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
    marginVertical: 10,
  },
  textContainer: {
    flexDirection: "column", // Ensures items are stacked vertically
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4, // Adds space between title and description
  },
  gameDescription: {
    fontSize: 14,
    color: "#666",
  },
});
