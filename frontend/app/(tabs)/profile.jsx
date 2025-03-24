import { StyleSheet, Text, View, Image, ImageBackground , TouchableOpacity} from 'react-native';
import React , {useState}from 'react';
import logo from '../../assets/images/logo-circle.png'
import background from '../../assets/images/new-background.jpg'
import { FontAwesome } from "@expo/vector-icons";
import CustomSlider from '../../components/CustomSlider';

const Profile = () => {
  const user = {
    profilePic: require('../../assets/images/profile.png'), // Replace with actual image path
    username: 'John Doe',
    email: 'johndoe@example.com',
    age: 25,
    gender: 'Male',
  };

  const [moodScore, setMoodScore] = useState(3); // Hardcoded initial value

  return (
    <ImageBackground
            source={background} // Update the path as per your folder structure
              style={styles.background}
              resizeMode="cover" >
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
              <Image source={logo} resizeMode="contain" style={styles.icon} />
              <Text style={styles.appName}>MindMend</Text>
              <TouchableOpacity style={{ marginRight: 10 }}>
              <FontAwesome name="ellipsis-v" size={24} color="black"  />
            </TouchableOpacity>
      </View>

      {/* Profile Info */}
      <View style={styles.profileContainer}>
        <Image source={user.profilePic} style={styles.profileImage} />
        <Text style={styles.username}>{user.username}</Text>
      </View>

      {/* User Details */}
      <View style={styles.infoContainer}>
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>Email:</Text>
    <Text style={styles.infoValue}>{user.email}</Text>
  </View>
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>Age:</Text>
    <Text style={styles.infoValue}>{user.age}</Text>
  </View>
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>Gender:</Text>
    <Text style={styles.infoValue}>{user.gender}</Text>
  </View>
</View>
  <View style={styles.sliderContainer}>
      <CustomSlider min={1} max={5} step={1} initialValue={3} onValueChange={setMoodScore}/>
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
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Optional: Semi-transparent overlay
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent:'space-around'
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
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileContainer: {
    alignItems: 'center',
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
    fontWeight: 'bold',
    color: '#333',
  },
  infoContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
    paddingBottom: 10,
    borderBottomWidth:0.5
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "flex-start", // Align content to the start
    alignItems: "center", // Center align items vertically
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    width: 80, // Fixed width to keep alignment consistent
  },
  infoValue: {
    fontSize: 16,
    color: "#555",
    flex: 1, // Ensures it takes remaining space and aligns left
    textAlign: "left",
  },

  sliderContainer:{
    marginTop: 20,
    // alignItems:'center'
  },

});
