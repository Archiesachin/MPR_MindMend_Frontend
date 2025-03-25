import React from 'react'
import { StyleSheet, View, Image, Text, Dimensions } from 'react-native'

const AlbumDetails = ({trackName, artistName}) => {
  return (
    <View style={{justifyContent:'center'}}>
        <Text style={styles.name}>{trackName}</Text>
        <Text style={styles.name}>{artistName}</Text>
    </View>
  )
}

export default AlbumDetails

const styles = StyleSheet.create({
    name:{
        textAlign:'center',
        fontWeight:'bold',
        fontSize:20,
        color:'black'
    }
})