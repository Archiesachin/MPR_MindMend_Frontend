import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo-circle.png";
import background from "../../assets/images/new-background.jpg";
import { FontAwesome } from "@expo/vector-icons";
import CustomSlider from "../../components/CustomSlider";
import axios from "axios";
import { API_URL } from "../context/AuthContext";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    username: "",
    email: "",
    phoneNumber: null,
    age: null,
    gender: "",
    profilePic: require("../../assets/images/profile.png"),
  });

  const [testResults, setTestResults] = useState(null);
  const [moodScore, setMoodScore] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        const { data } = await axios.get(`${API_URL}/api/protected`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const info = data.user;

        setUser({
          username: info.fullName,
          email: info.email,
          phoneNumber: info.phoneNumber,
          age: info.age,
          gender: info.gender,
          profilePic: info.profilePic || require("../../assets/images/profile.png"),
        });
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  const handleTestPress = () => {
    navigation.navigate("QuizScreen", { setTestResults });
  };

  return (
    <ImageBackground source={background} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={logo} resizeMode="contain" style={styles.icon} />
          <Text style={styles.appName}>MindMend</Text>
          <TouchableOpacity style={{ marginRight: 10 }}>
            <FontAwesome name="ellipsis-v" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileContainer}>
          <Image source={user.profilePic} style={styles.profileImage} />
          <Text style={styles.username}>{user.username}</Text>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}><Text style={styles.infoLabel}>Email:</Text><Text style={styles.infoValue}>{user.email}</Text></View>
          <View style={styles.infoRow}><Text style={styles.infoLabel}>Phone:</Text><Text style={styles.infoValue}>{user.phoneNumber}</Text></View>
          <View style={styles.infoRow}><Text style={styles.infoLabel}>Age:</Text><Text style={styles.infoValue}>{user.age}</Text></View>
          <View style={styles.infoRow}><Text style={styles.infoLabel}>Gender:</Text><Text style={styles.infoValue}>{user.gender}</Text></View>
        </View>

        <TouchableOpacity onPress={handleTestPress} style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.cardText}>
              {testResults
                ? `Detected Disorders: ${testResults.disorders.join(", ")}. Score: ${testResults.score}`
                : "Take this test to assess your mental well-being and get insights!"}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.sliderContainer}>
          <CustomSlider min={1} max={5} step={1} initialValue={3} onValueChange={setMoodScore} />
        </View>
      </View>
    </ImageBackground>
  );
};

export default Profile;

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
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  infoContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    width: 80,
  },
  infoValue: {
    fontSize: 16,
    color: "#555",
    flex: 1,
    textAlign: "left",
  },
  cardContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  card: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
    fontWeight: "bold",
  },
  sliderContainer: {
    marginTop: 20,
  },
});