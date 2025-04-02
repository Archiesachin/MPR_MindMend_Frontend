import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import Svg, { Polyline, Circle } from "react-native-svg";

const { width } = Dimensions.get("window");
const GRAPH_WIDTH = width - 80; // Graph width
const GRAPH_HEIGHT = 200; // Graph height
const Y_MAX = 3.5; // Maximum Y-axis value

const LineGraph = ({ taskScores }) => {
  const numTasks = taskScores.length;
  const xSpacing = GRAPH_WIDTH / Math.max(numTasks - 1, 1); // Dynamic X-axis spacing

  // Normalize the Y-axis values (convert score to graph height)
  const normalizeY = (value) => GRAPH_HEIGHT - (value / Y_MAX) * GRAPH_HEIGHT;

  // Generate points for the polyline
  const points = taskScores
    .map((score, index) => `${index * xSpacing},${normalizeY(score)}`)
    .join(" ");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Performance</Text>

      {/* Graph container */}
      <View style={styles.graphContainer}>
        {/* X-Axis */}
        <View style={styles.xAxis} />
        {/* Y-Axis */}
        <View style={styles.yAxis} />

        {/* SVG for Connecting Lines and Dots */}
        <Svg height={GRAPH_HEIGHT} width={GRAPH_WIDTH} style={styles.svgContainer}>
          {/* Connecting Lines */}
          <Polyline
            points={points}
            fill="none"
            stroke="#38b6ff"
            strokeWidth="2"
          />
          {/* Plot Dots */}
          {taskScores.map((score, index) => {
            const x = index * xSpacing;
            const y = normalizeY(score);
            return <Circle key={index} cx={x} cy={y} r={5} fill="#38b6ff" />;
          })}
        </Svg>

        {/* Score Labels */}
        

        {/* X-Axis Labels */}
        {taskScores.map((_, index) => {
          const x = index * xSpacing;
          return (
            <Text key={`x-label-${index}`} style={[styles.xLabel, { left: x - 10 }]}>
              Task {index + 1}
            </Text>
          );
        })}

        {/* Y-Axis Labels */}
        {[0, 1, 2, 3].map((value) => {
          const y = normalizeY(value);
          return (
            <Text key={`y-label-${value}`} style={[styles.yLabel, { top: y - 10 }]}>
              {value}
            </Text>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center", padding: 20, marginBottom: 20 },
  title: { fontSize: 18, marginBottom: 30, fontWeight: "bold" },
  graphContainer: { width: GRAPH_WIDTH, height: GRAPH_HEIGHT, position: "relative" },

  // X & Y Axis Styles
  xAxis: {
    position: "absolute",
    width: GRAPH_WIDTH,
    height: 2,
    backgroundColor: "black",
    bottom: 0,
  },
  yAxis: {
    position: "absolute",
    height: GRAPH_HEIGHT,
    width: 2,
    backgroundColor: "black",
    left: 0,
  },

  // SVG Container
  svgContainer: {
    position: "absolute",
    top: 0,
    left: 0,
  },

  // Labels & Points
  label: { position: "absolute", fontSize: 12, color: "black" },
  xLabel: { position: "absolute", top: GRAPH_HEIGHT + 8, fontSize: 12, color: "black" },
  yLabel: { position: "absolute", left: -30, fontSize: 12, color: "black" },
});

export default LineGraph;
