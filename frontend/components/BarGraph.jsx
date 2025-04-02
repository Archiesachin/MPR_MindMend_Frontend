import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const GRAPH_WIDTH = width - 80; // Graph width
const GRAPH_HEIGHT = 250; // Graph height
const BAR_WIDTH = 40; // Width of each bar
const BAR_SPACING = 25; // Space between bars

const BarGraph = ({ distortionData }) => {
  const [data, setData] = useState({}); // Store distortions and their counts

  useEffect(() => {
    // Update counts dynamically
    setData((prevData) => {
      const newData = { ...prevData };
      distortionData.forEach((distortion) => {
        newData[distortion] = (newData[distortion] || 0) + 1;
      });
      return newData;
    });
  }, [distortionData]);

  const maxCount = Math.max(...Object.values(data), 1); // Max count for scaling
  const normalizeHeight = (count) => (count / maxCount) * GRAPH_HEIGHT; // Scale bars

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Distortion Counts</Text>

      <View style={styles.graphContainer}>
        {/* X & Y Axes */}
        <View style={styles.xAxis} />
        <View style={styles.yAxis} />

        {/* Bars */}
        {Object.entries(data).map(([distortion, count], index) => {
          const barHeight = normalizeHeight(count);
          const xPosition = index * (BAR_WIDTH + BAR_SPACING);

          return (
            <View key={distortion} style={[styles.barContainer, { left: xPosition }]}>
              <View style={[styles.bar, { height: barHeight }]} />
              <Text style={styles.barLabel}>{count}</Text>
              <Text style={styles.xLabel}>{distortion}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center", padding: 20, marginBottom: 20 },
  title: { fontSize: 18, marginBottom: 30, fontWeight: "bold" },
  graphContainer: { width: GRAPH_WIDTH, height: GRAPH_HEIGHT + 50, position: "relative" },

  // X & Y Axes
  xAxis: { position: "absolute", width: GRAPH_WIDTH +5, height: 2, backgroundColor: "black", bottom: 36 },
  yAxis: { position: "absolute", height: GRAPH_HEIGHT + 15, width: 2, backgroundColor: "black", left: -5 },

  // Bars
  barContainer: { position: "absolute", bottom: 40, alignItems: "center" },
  bar: { width: BAR_WIDTH, backgroundColor: "#38b6ff", borderTopLeftRadius: 5, borderTopRightRadius: 5 },
  barLabel: { position: "absolute", top: -20, fontSize: 12, color: "black" },

  // X-axis Labels
  xLabel: { position: "absolute", top: GRAPH_HEIGHT + 10, fontSize: 12, color: "black", textAlign: "center", width: BAR_WIDTH },
});

export default BarGraph;
