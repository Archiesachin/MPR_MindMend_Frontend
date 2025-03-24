import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import logo from '../../assets/images/logo-circle.png'

const Profile = () => {
  const user = {
    profilePic: require('../../assets/icons/profile.png'), // Replace with actual image path
    username: 'John Doe',
    email: 'johndoe@example.com',
    age: 25,
    gender: 'Male',
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.headerText}>MindMend</Text>
      </View>

      {/* Profile Info */}
      <View style={styles.profileContainer}>
        <Image source={user.profilePic} style={styles.profileImage} />
        <Text style={styles.username}>{user.username}</Text>
      </View>

      {/* User Details */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Email: {user.email}</Text>
        <Text style={styles.infoText}>Age: {user.age}</Text>
        <Text style={styles.infoText}>Gender: {user.gender}</Text>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    paddingVertical: 15,
    backgroundColor: '#38b6ff',
    borderRadius: 10,
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
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
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3, // Adds shadow on Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
});
