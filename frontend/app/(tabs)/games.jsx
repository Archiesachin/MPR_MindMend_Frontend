import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import logo from '../../assets/images/logo-circle.png'; // Adjust the path as needed

const Games = () => {
  const navigation = useNavigation();

  const games = [
    {
      title: 'Breathing Bubbles',
      description: 'Breathing Bubbles is a fun way to practice mindfulness by focusing on the present moment.',
      route: 'breathingBubbleGuide',
    },
    {
      title: 'Meditation Guide',
      description: 'A guided meditation to help you relax and calm your mind.',
      route: 'MeditationGuideScreen',
    },
    {
      title: 'Breathing Exercise',
      description: 'A simple breathing exercise to reduce anxiety and stress.',
      route: 'BreathingExerciseScreen',
    },
    {
      title: 'Cognitive Restructuring',
      description: 'Challenge your negative thoughts and reframe them in a positive way.',
      route: 'CognitiveRestructuringScreen',
    },
  ];

  const handlePress = (route) => {
    navigation.navigate(route);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.appName}>MindMend</Text>
      </View>
      <ScrollView style={styles.gameList}>
        <Text style={styles.heading}>Mental Health Games</Text>
        {games.map((game, index) => (
          <TouchableOpacity key={index} style={styles.gameBox} onPress={() => handlePress(game.route)}>
            <Text style={styles.gameTitle}>{game.title}</Text>
            <Text style={styles.gameDescription}>{game.description}</Text>
          </TouchableOpacity>
        ))}
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
