import { Text, View, Image, StyleSheet } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { icons } from '../../constants/icons';

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
                            icon={icons.home}
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
                            icon={icons.profile}
                            color={color}
                            name='Profile'
                            focused={focused}
                        />
                    )
                }}
            />

            <Tabs.Screen name='journal' options={{ tabBarButton: () => null, headerShown: false }} />
            <Tabs.Screen name='todo' options={{ tabBarButton: () => null, headerShown: false }} />
            <Tabs.Screen name='games' options={{ tabBarButton: () => null, headerShown: false }} />
            <Tabs.Screen name='breathingBubble' options={{ tabBarButton: () => null, headerShown: false }} />
        </Tabs>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
    },
    icon: {
        width: 24,
        height: 24,
    },
    iconText: {
        fontSize: 12,
    },
    tabBar: {
        height: 70,
    }
});

export default TabsLayout;