import React from 'react'
import { View , Text, ImageBackground, TouchableOpacity, StyleSheet, Image} from 'react-native'
import background from '../../assets/images/new-background.jpg';
import logo from '../../assets/images/logo-circle.png'; // Add your logo image path
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from 'expo-router';

const tasksHistoryScreen = () => {
    const router = useRouter()
  return (
       <ImageBackground source={background} style={styles.background} resizeMode="cover">
          {/* Header Section */}
          <View style={styles.header}>
                  <Image source={logo} resizeMode="contain" style={styles.icon} />
                  <Text style={styles.appName}>MindMend</Text>
                  <TouchableOpacity style={{ marginRight: 10 }} onPress={() => router.push('/tasks')}>
                  <Text style={styles.back}>Back</Text>
                </TouchableOpacity>
                </View>
        </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
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

  back:{
    fontSize:15,

  },
})

export default tasksHistoryScreen