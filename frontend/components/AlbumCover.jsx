import React from 'react'
import { StyleSheet, View, Image, Text, Dimensions } from 'react-native'


const { width } = Dimensions.get('window'); 


const AlbumCover = ({albumCover}) => {
  return (
    <View>
        <Image 
        source={{uri: albumCover}} 
        style={{width, height: 300, borderRadius: 5}}
        resizeMode='contain'/>
    </View>
  )
}

export default AlbumCover