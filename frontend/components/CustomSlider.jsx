import React, { useState, useRef } from "react";
import { View, Text, PanResponder, Animated, StyleSheet } from "react-native";

const CustomSlider = ({ min = 1, max = 5, step = 0.5, initialValue = 3, onValueChange }) => {
  const trackWidth = 300; // Slider width
  const thumbSize = 30; // Thumb button size
  const stepsCount = (max - min) / step; // Number of steps
  const stepWidth = trackWidth / stepsCount; // Distance per step

  const [sliderValue, setSliderValue] = useState(initialValue);
  const position = useRef(new Animated.Value((initialValue - min) * stepWidth)).current;

  // Handle gestures using PanResponder
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        let newX = Math.max(0, Math.min(trackWidth, gestureState.dx));
        let newValue = Math.round((newX / stepWidth) * 2) / 2 + min; // Round to nearest 0.5

        setSliderValue(newValue);
        onValueChange(newValue);

        Animated.timing(position, {
          toValue: newX,
          duration: 0,
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  return (
    <View style={styles.sliderContainer}>
      <Text style={styles.moodLabel}>Your Mood Score: {sliderValue.toFixed(1)}</Text>

      {/* Track */}
      <View style={styles.track}>
        {/* Markers */}
        {[...Array(stepsCount + 1)].map((_, i) => (
          <View key={i} style={[styles.marker, { left: i * stepWidth - thumbSize / 4 }]} />
        ))}

        {/* Draggable Thumb */}
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.thumb,
            { transform: [{ translateX: position }] },
          ]}
        />
      </View>

      {/* Scale Labels */}
      <View style={styles.scale}>
        {[...Array(stepsCount + 1)].map((_, i) => {
          const value = (i * step + min).toFixed(1); // Ensure decimal formatting
          return (
            <Text key={i} style={[styles.scaleText, sliderValue == value && styles.activeScaleText]}>
              {value}
            </Text>
          );
        })}
      </View>
    </View>
  );
};

export default CustomSlider;

const styles = StyleSheet.create({
  sliderContainer: {
    width: 320,
    alignItems: "center",
    marginTop: 30,
    marginLeft: 20,
  },
  moodLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 30,
  },
  track: {
    width: 300,
    height: 4,
    backgroundColor: "#ccc",
    borderRadius: 2,
    position: "relative",
  },
  thumb: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#38b6ff",
    position: "absolute",
    top: -13,
  },
  marker: {
    width: 6,
    height: 6,
    backgroundColor: "#000",
    borderRadius: 3,
    position: "absolute",
    top: -1,
  },
  scale: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
    marginTop: 10,
  },
  scaleText: {
    fontSize: 14,
    color: "#555",
  },
  activeScaleText: {
    fontWeight: "bold",
    color: "#38b6ff",
  },
});
