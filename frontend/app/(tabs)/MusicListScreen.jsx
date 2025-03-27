import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { Link, useRouter } from "expo-router"; 
import { TRACKS } from "../../constants/tracks";
import logo from '../../assets/images/logo-circle.png'; // Adjust the path as needed
import background from '../../assets/images/new-background.jpg'
import { FontAwesome } from "@expo/vector-icons";

const MusicListScreen = () => {

  const router = useRouter()
  return (
         <ImageBackground
            source={background} // Update the path as per your folder structure
              style={styles.background}
              resizeMode="cover" >
        <View style={styles.container}>
          <View style={styles.header}>
                  <Image source={logo} resizeMode="contain" style={styles.icon} />
                  <Text style={styles.appName}>MindMend</Text>
                  <TouchableOpacity style={{ marginRight: 10 }} onPress={() => router.push('/games')}>
                    <Text style={styles.back}>Back</Text>
                  </TouchableOpacity>
                </View>

      <Text style={styles.title}>Music Therapy</Text>
      
      <FlatList
        data={TRACKS}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Link href={{ pathname: "/MusicTherapyScreen", params: { selectedTrack: index } }} asChild>
            <TouchableOpacity style={styles.trackItem}>
              <Image source={{ uri: item.albumArtUrl }} style={styles.albumArt} />
              <View style={styles.trackInfo}>
                <Text style={styles.trackTitle}>{item.title}</Text>
                <Text style={styles.trackArtist}>{item.artist}</Text>
              </View>
            </TouchableOpacity>
          </Link>
        )}
      />

    </View>
    </ImageBackground>
  );
};

export default MusicListScreen;

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
    justifyContent:'space-around',
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign:'center',
    marginTop: 20
  },
  gameDescription: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  trackItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingLeft:20,
    paddingTop: 30
  },
  albumArt: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  trackArtist: {
    fontSize: 14,
    color: "#666",
  },
  back:{
    fontSize:15,
  },
});
