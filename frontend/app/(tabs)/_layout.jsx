import { Text, View, Image, StyleSheet } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import home from '../../assets/icons/home.png';
import profile from '../../assets/icons/profile.png';
import play from '../../assets/icons/play.png';
import tasks from '../../assets/icons/planning.png';
import journal from '../../assets/icons/diary.png';
import therapist from '../../assets/images/therapist.png'

const TabIcon = ({ icon, color, name, focused }) => {
    return (
        <View style={styles.iconContainer}>
            <Image
                source={icon}
                resizeMode="contain"
                style={[
                    styles.icon,
                    { tintColor: focused ? '#38b6ff' : color } // Apply focused color
                ]}
            />
            <Text style={[
                styles.iconText,
                { color: focused ? '#38b6ff' : color, fontWeight: focused ? 'bold' : 'normal' }
            ]}>
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
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: '#38b6ff', // Set focused tab text color
                tabBarInactiveTintColor: '#808080', // Set inactive tab color
            }}
        >
            <Tabs.Screen
                name='home'
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon icon={home} color={color} name='Home' focused={focused} />
                    )
                }}
            />

            

            <Tabs.Screen
                name='games'
                options={{
                    title: 'Game',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon icon={play} color={color} name='Game' focused={focused} />
                    )
                }}
            />

            <Tabs.Screen
                name='journals'
                options={{
                    title: 'Journal',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon icon={journal} color={color} name='Journal' focused={focused} />
                    )
                }}
            />

            <Tabs.Screen
                name='tasks'
                options={{
                    title: 'Tasks',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon icon={tasks} color={color} name='Tasks' focused={focused} />
                    )
                }}
            />

<Tabs.Screen
                name='profile'
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon icon={profile} color={color} name='Profile' focused={focused} />
                    )
                }}
            />

<Tabs.Screen
                name='Therapists'
                options={{
                    title: 'Therapists',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon icon={therapist} color={color} name='Therapist' focused={focused} />
                    )
                }}
            />

<Tabs.Screen
  name="CognitiveRestructuringScreen"
  options={{
    headerShown: false,
    href: null,  // This completely hides the tab
  }}
/>

<Tabs.Screen
  name="tasksHistoryScreen"
  options={{
    headerShown: false,
    href: null,  // This completely hides the tab
  }}
/>

<Tabs.Screen
  name="MusicTherapyScreen"
  options={{
    headerShown: false,
    href: null,  // This completely hides the tab
  }}
/>

<Tabs.Screen
  name="MusicListScreen"
  options={{
    headerShown: false,
    href: null,  // This completely hides the tab
  }}
/>

<Tabs.Screen
  name="Feelopoly"
  options={{
    headerShown: false,
    href: null,  // This completely hides the tab
  }}
/>
<Tabs.Screen
  name="BreathingBubbleScreen"
  options={{
    headerShown: false,
    href: null,  // This completely hides the tab
  }}
/>



        </Tabs>

    );
};

const styles = StyleSheet.create({
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 20,
        height: 20,
    },
    iconText: {
        fontSize: 10,
        textAlign: 'center',
        width: 50,  // Ensures text does not wrap
    },
    tabBar: {
        height: 70,
        paddingTop: 15,
    }
});

export default TabsLayout;
