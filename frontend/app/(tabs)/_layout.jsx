import { Text, View, Image, StyleSheet } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import home from '../../assets/icons/home.png'
import profile from '../../assets/icons/profile.png'

const TabIcon = ({ icon, color, name, focused }) => {
    return (
        <View style={styles.iconContainer}>
            <Image
                source={icon}
                resizeMode="contain"
                style={[styles.icon, { tintColor: color }]}
            />
            <Text style={[styles.iconText, { color, fontWeight: focused ? 'bold' : 'normal' }]}>
                {name}
            </Text>
        </View>
    );
};

const TabsLayout = () => {
    return (
        <Tabs 
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar
            }}
        >
            <Tabs.Screen
                name='home'
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={home}
                            color={color}
                            name='Home'
                            focused={focused}
                        />
                    )
                }}
            />

            <Tabs.Screen
                name='profile'
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={profile}
                            color={color}
                            name='Profile'
                            focused={focused}
                        />
                    )
                }}
            />

         
        </Tabs>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign:'center',
        
    },
    icon: {
        width: 20,
        height: 20,
    },
    iconText: {
        fontSize: 10,
    },
    tabBar: {
        height: 70,
        paddingTop:15,
    }
});

export default TabsLayout;