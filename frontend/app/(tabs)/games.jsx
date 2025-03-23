import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import logo from '../../assets/images/logo-circle.png'; // Adjust the path as needed

const BreathingBubbles = () => (
  <Link href="/breathingBubbleGuide" style={styles.gameBox}>
    <Text style={styles.gameTitle}>Breathing Bubbles</Text>
    <Text style={styles.gameDescription}>Practice mindfulness by focusing on the present moment.</Text>
  </Link>
);

const MeditationGuide = () => (
  <Link href="/MeditationGuideScreen" style={styles.gameBox}>
    <Text style={styles.gameTitle}>Meditation Guide</Text>
    <Text style={styles.gameDescription}>A guided meditation to help you relax and calm your mind.</Text>
  </Link>
);

const BreathingExercise = () => (
  <Link href="/BreathingExerciseScreen" style={styles.gameBox}>
    <Text style={styles.gameTitle}>Breathing Exercise</Text>
    <Text style={styles.gameDescription}>A simple breathing exercise to reduce anxiety and stress.</Text>
  </Link>
);

const CognitiveRestructuring = () => (
  <Link href="/CognitiveRestructuringScreen" style={styles.gameBox}>
    <Text style={styles.gameTitle}>Cognitive Restructuring</Text>
    <Text style={styles.gameDescription}>Challenge negative thoughts and reframe them positively.</Text>
  </Link>
);

const Games = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.appName}>MindMend</Text>
      </View>
      <ScrollView style={styles.gameList}>
        <Text style={styles.heading}>Mental Health Games</Text>
        <BreathingBubbles />
        <MeditationGuide />
        <BreathingExercise />
        <CognitiveRestructuring />
      </ScrollView>
    </View>
  );
};

export default Games;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#38b6ff',
  },
  logo: {
    height: 50,
    width: 50,
    marginRight: 10,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
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
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  gameDescription: {
    fontSize: 14,
    color: '#555',
  },
});
