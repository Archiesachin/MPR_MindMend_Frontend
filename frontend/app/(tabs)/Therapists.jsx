import React, { useState, useEffect } from "react";
import {
  View,
  Alert,
  Linking,
  StyleSheet,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native";
import logo from "../../assets/images/logo-circle.png";
import background from "../../assets/images/new-background.jpg";
import { FontAwesome } from "@expo/vector-icons";

const predefinedTherapists = [
  {
    id: 1,
    name: "Amaha Mental Health Centre, Mumbai",
    lat: 19.054786,
    lng: 72.839978,
    address: "Mumbai, India",
    googleUrl: "https://www.google.com/search?q=Amaha+Mental+Health+Centre+Mumbai",
  },
  {
    id: 2,
    alt_name: "Better Self - Best Psychological Wellness Center",
    lat: 19.060035,
    lng: 72.823594,
    address: "Mumbai, India",
    googleUrl: "https://www.google.com/search?q=Better+Self+Psychological+Wellness+Center",
  },
  {
    id: 3,
    alt_name: "Shrradha Sidhwani - Counselling Psychologist",
    lat: 40.525143,
    lng: -80.701421,
    address: "USA",
    googleUrl: "https://www.google.com/search?q=Shrradha+Sidhwani+Counselling+Psychologist",
  },
  {
    id: 4,
    alt_name: "Dr. Alisha Lalljee",
    lat: 19.064127,
    lng: 72.829925,
    address: "Mumbai, India",
    googleUrl: "https://www.google.com/search?q=Dr+Alisha+Lalljee",
  },
  {
    id: 5,
    alt_name: "Jaanvi Java | Psychologist in Bandra",
    lat: 19.065325,
    lng: 72.831737,
    address: "Bandra, Mumbai, India",
    googleUrl: "https://www.google.com/search?q=Jaanvi+Java+Psychologist+Bandra",
  },
];

const Therapists = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location access is required to find nearby therapists."
        );
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = userLocation.coords;
      setLocation({ latitude, longitude });
    })();
  }, []);

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
        <SafeAreaView style={{ flex: 1 }}>
          {location ? (
            <MapView
              style={{ flex: 1, width: "100%", height: "100%" }}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
              showsUserLocation={true}
            >
              <Marker coordinate={location} title="Your Location" pinColor="blue" />

              {predefinedTherapists.map((therapist) => (
                <Marker
                  key={therapist.id}
                  coordinate={{ latitude: therapist.lat, longitude: therapist.lng }}
                  title={therapist.alt_name}
                  description={therapist.address}
                  pinColor="red"
                  onPress={() => Linking.openURL(therapist.googleUrl)}
                />
              ))}
            </MapView>
          ) : null}
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

export default Therapists;

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
