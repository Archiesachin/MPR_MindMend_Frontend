import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Draggable from 'react-native-draggable';
import { Link } from 'expo-router';

const CognitiveRestructuringGame = () => {
  const [matched, setMatched] = useState(false);

  const badThoughts = [
    { id: 1, text: "I'm not good enough", position: { x: 50, y: 100 } },
    { id: 2, text: "I always fail", position: { x: 50, y: 200 } },
    { id: 3, text: "Nobody likes me", position: { x: 50, y: 300 } },
  ];

  const goodThoughts = [
    { id: 1, text: "I am capable and strong", position: { x: 250, y: 100 } },
    { id: 2, text: "Failures help me grow", position: { x: 250, y: 200 } },
    { id: 3, text: "I am valued and loved", position: { x: 250, y: 300 } },
  ];

  const handleDrop = (goodId, badId) => {
    if (goodId === badId) {
      setMatched(true);
      Alert.alert("Great Job! ✅", "You successfully restructured the thought!");
    } else {
      Alert.alert("Oops! ❌", "That doesn't match. Try again!");
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.title}>Drag the positive thought onto the negative one!</Text>

      <View style={styles.thoughtContainer}>
        {badThoughts.map((thought) => (
          <View key={thought.id} style={[styles.badThought, { top: thought.position.y }]}>
            <Text style={styles.thoughtText}>{thought.text}</Text>
          </View>
        ))}

        {goodThoughts.map((thought) => (
          <Draggable
            key={thought.id}
            x={thought.position.x}
            y={thought.position.y}
            onDragRelease={(e) => handleDrop(thought.id, Math.ceil(e.nativeEvent.pageY / 100))}
          >
            <View style={styles.goodThought}>
              <Text style={styles.thoughtText}>{thought.text}</Text>
            </View>
          </Draggable>
        ))}
      </View>

      {matched && <Text style={styles.successText}>Great job restructuring your thoughts! 🎉</Text>}

      <Link href="/" style={styles.backButton}>Back to Home</Link>
    </GestureHandlerRootView>
  );
};

export default CognitiveRestructuringGame;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
  successText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#228B22',
  },
  backButton: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#38b6ff',
    color: '#fff',
    borderRadius: 10,
    textAlign: 'center',
  },
});
