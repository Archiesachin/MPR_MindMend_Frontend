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
import logo from "../../assets/images/logo-circle.png"; // Adjust the path as needed
import background from "../../assets/images/new-background.jpg";
import { FontAwesome } from "@expo/vector-icons";

const Therapists = () => {
  const [location, setLocation] = useState(null);
  const [therapists, setTherapists] = useState([]);

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

      // ✅ Log the user's coordinates to the console
      console.log("User's Current Location:", { latitude, longitude });

      setLocation({ latitude, longitude });
      fetchNearbyTherapists(latitude, longitude);
    })();
  }, []);

  const fetchNearbyTherapists = async (lat, lng) => {
    try {
      console.log("Fetching therapists near:", lat, lng); // ✅ Log fetched location for debugging

      const overpassQuery = `
      [out:json];
      (
        node(around:15000,${lat},${lng})["healthcare"~"psychotherapist|psychology|psychiatry|mental_health"];
        node(around:15000,${lat},${lng})["amenity"~"clinic"]["healthcare"="mental_health"];
        node(around:15000,${lat},${lng})["office"="therapist"];

      );
      out;
    `;

      const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
        overpassQuery
      )}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.elements) {
        setTherapists(
          data.elements.map((item) => ({
            id: item.id,
            name: item.tags.alt_name || "Therapist",
            lat: item.lat,
            lng: item.lon,
            address: item.tags["addr:full"] || "No address available",
            googleUrl: `https://www.google.com/search?q=${encodeURIComponent(
              item.tags.alt_name || "therapist"
            )}`,
          }))
        );
        console.log("Therapists Data:", data.elements); // ✅ Log therapist data
      }
    } catch (error) {
      console.error("Error fetching therapists:", error);
    }
  };

  return (
    <ImageBackground
      source={background} // Update the path as per your folder structure
      style={styles.background}
      resizeMode="cover"
    >
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
              {/* Blue Marker for User's Location */}
              <Marker
                coordinate={location}
                title="Your Location"
                pinColor="blue"
              />

              {/* Red Markers for Therapists */}
              {therapists.map((therapist) => (
                <Marker
                  key={therapist.id}
                  coordinate={{
                    latitude: therapist.lat,
                    longitude: therapist.lng,
                  }}
                  title={therapist.name}
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
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Optional: Semi-transparent overlay
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
