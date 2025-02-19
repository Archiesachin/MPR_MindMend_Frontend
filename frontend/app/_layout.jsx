import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'

const Rootlayout = () => {  
    return(
    <Stack>
        <Stack.Screen name='index' options={{headerShown:false}} />
    </Stack>
  )
}

export default Rootlayout

