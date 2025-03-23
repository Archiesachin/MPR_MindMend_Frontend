import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Draggable from 'react-native-draggable';
import { useRouter } from 'expo-router';
import logo from '../../assets/images/logo-circle.png';

const CognitiveRestructuringGame = () => {
  const [matchedPairs, setMatchedPairs] = useState({});
  const router = useRouter();

  const badThoughts = [
    { id: 1, text: "I'm not good enough", position: { x: 50, y: 40 } },
    { id: 2, text: "I always fail", position: { x: 50, y: 110 } },
    { id: 3, text: "Nobody likes me", position: { x: 50, y: 180 } },
  ];

  const goodThoughts = [
    { id: 2, text: "Failures help me grow", position: { x: 50, y: 300 } },
    { id: 1, text: "I am capable and strong", position: { x: 50, y: 370 } },
    { id: 3, text: "I am valued and loved", position: { x: 50, y: 460 } },
  ];

  const handleDrop = (goodId, badId) => {
    if (goodId === badId) {
      setMatchedPairs((prev) => ({ ...prev, [badId]: true }));
      Alert.alert("Great Job! ✅", "You successfully restructured the thought!");
    } else {
      Alert.alert("Oops! ❌", "That doesn't match. Try again!");
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.appName}>MindMend</Text>
      </View>

      {/* Title and Subtitle */}
      <Text style={styles.title}>Cognitive Restructuring</Text>
      <Text style={styles.subtitle}>Drag the positive thought onto the negative one!</Text>

      {/* Thoughts Section */}
      <View style={styles.thoughtContainer}>
        {badThoughts.map((thought) => (
          <View
            key={thought.id}
            style={[
              styles.badThought,
              { top: thought.position.y },
              matchedPairs[thought.id] && styles.matchedThought,
            ]}
          >
            <Text style={styles.thoughtText}>{thought.text}</Text>
          </View>
        ))}

        {goodThoughts.map((thought) => (
          <Draggable
            key={thought.id}
            x={thought.position.x}
            y={thought.position.y}
            onDragRelease={(e) => {
              const droppedY = e.nativeEvent.pageY;
              const matchedBadThought = badThoughts.find(
                (bt) => Math.abs(bt.position.y - droppedY) < 50
              );

              if (matchedBadThought) {
                handleDrop(thought.id, matchedBadThought.id);
              }
            }}
          >
            <View style={styles.goodThought}>
              <Text style={styles.thoughtText}>{thought.text}</Text>
            </View>
          </Draggable>
        ))}
      </View>
    </GestureHandlerRootView>
  );
};

export default CognitiveRestructuringGame;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    // alignItems: 'center',
    // padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
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
    marginLeft:10
  },
  backButton: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
    marginRight: 'auto',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
 
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 10
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  thoughtContainer: {
    width: '100%',
    alignItems: 'center',
  },
  badThought: {
    position: 'absolute',
    left: 50,
    backgroundColor: '#ff6961',
    padding: 15,
    borderRadius: 10,
    width: 200,
    alignItems: 'center',
  },
  matchedThought: {
    backgroundColor: '#77dd77',
  },
  goodThought: {
    backgroundColor: '#77dd77',
    padding: 15,
    borderRadius: 10,
    width: 200,
    alignItems: 'center',
  },
  thoughtText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
