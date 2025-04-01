import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";

const CustomSlider = ({ min = 0, max = 3, step = 1, value = 0 }) => {
  const trackWidth = 300; // Slider width
  const thumbSize = 30; // Thumb size
  const stepsCount = (max - min) / step; // Number of steps
  const stepWidth = trackWidth / stepsCount; // Distance per step

  const position = useRef(
    new Animated.Value((value - min) * stepWidth)
  ).current;

  // Animate the slider to the new value
  useEffect(() => {
    if (value !== undefined) {
      const newPosition = (value - min) * stepWidth;
      Animated.timing(position, {
        toValue: newPosition,
        duration: 300, // Smooth animation duration
        useNativeDriver: false,
      }).start();
    }
  }, [value]);

  return (
    <View style={styles.sliderContainer}>
      <Text style={styles.moodLabel}>Your Mood Score: {value?.toFixed(1)}</Text>

      {/* Track */}
      <View style={styles.track}>
        {/* Markers */}
        {[...Array(stepsCount + 1)].map((_, i) => (
          <View
            key={i}
            style={[styles.marker, { left: i * stepWidth - thumbSize / 4 }]}
          />
        ))}

        {/* Animated Thumb */}
        <Animated.View
          style={[styles.thumb, { transform: [{ translateX: position }] }]}
        />
      </View>

      {/* Scale Labels */}
      <View style={styles.scale}>
        {[...Array(stepsCount + 1)].map((_, i) => {
          const labelValue = (i * step + min).toFixed(1);
          return (
            <Text
              key={i}
              style={[
                styles.scaleText,
                parseFloat(value) === parseFloat(labelValue) &&
                  styles.activeScaleText,
              ]}
            >
              {labelValue}
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
    marginLeft: 40,
    marginBottom: 35,
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
    left: -20,
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
