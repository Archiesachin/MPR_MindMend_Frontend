import React, { useState, useEffect } from "react";
import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams , useRouter} from "expo-router"; 
import { Audio } from "expo-av";
import { FontAwesome } from "@expo/vector-icons";
import { TRACKS } from "../../constants/tracks";
import logo from "../../assets/images/logo-circle.png";
import background from "../../assets/images/new-background.jpg";
import AlbumCover from "../../components/AlbumCover";
import AlbumDetails from "../../components/AlbumDetails";
import Controls from "../../components/Controls";

const MusicTherapyScreen = () => {
  const { selectedTrack } = useLocalSearchParams();
  const trackIndex = parseInt(selectedTrack, 10) || 0;
  const [pause, setPause] = useState(true);
  const [sound, setSound] = useState(null);

  const currentTrack = TRACKS[trackIndex];

  useEffect(() => {
    configureAudio();
  }, []);

  useEffect(() => {
    loadAudio();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [trackIndex]);

  async function configureAudio() {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
    });
  }

  async function loadAudio() {
    if (sound) {
      await sound.unloadAsync();
    }

    const source = typeof currentTrack.audioUrl === "string"
      ? { uri: currentTrack.audioUrl }
      : currentTrack.audioUrl;

    const { sound: newSound } = await Audio.Sound.createAsync(source, { shouldPlay: true });

    setSound(newSound);
  }

  async function onPlay() {
    if (sound) {
      await sound.playAsync();
    }
    setPause(false);
  }

  async function onPause() {
    if (sound) {
      await sound.pauseAsync();
    }
    setPause(true);
  }


  const router = useRouter()

  return (
    <ImageBackground source={background} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={logo} resizeMode="contain" style={styles.icon} />
          <Text style={styles.appName}>MindMend</Text>
          <TouchableOpacity style={{ marginRight: 10 }} onPress={() => router.push('/MusicListScreen')}>
                              <Text style={styles.back}>Back</Text>
                            </TouchableOpacity>
        </View>

        <AlbumCover albumCover={currentTrack.albumArtUrl} />
        <AlbumDetails trackName={currentTrack.title} artistName={currentTrack.artist} />
        <Controls {...{ pause, onPause, onPlay }} />
      </View>
    </ImageBackground>
  );
};

export default MusicTherapyScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent: "space-around",
  },
  icon: {
    marginLeft: 10,
    height: 80,
    width: 60,
    marginRight: 10,
  },
  appName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    flex: 1,
  },
});
