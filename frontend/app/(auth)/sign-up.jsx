import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Dimensions, SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import logo from "../../assets/images/logo-circle.png";
import UserTextInput from '../../components/UserTextInput';

import { avatars } from '../../utils/support';
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';

import { Picker } from '@react-native-picker/picker';

const SignUp = () => {
    const screenWidth = Math.round(Dimensions.get("window").width);
    const screenHeight = Math.round(Dimensions.get("window").height);

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(""); 
    const [age, setAge] = useState(""); 
    const [gender, setGender] = useState(""); 
    const [avatar, setAvatar] = useState(avatars[0]?.image.asset.url);
    const [isAvatarMenu, setIsAvatarMenu] = useState(false);
    const [getEmailValidationStatus, setGetEmailValidationStatus] = useState(false);

    const handleAvatar = (item) => {
        setAvatar(item?.image.asset.url);
        setIsAvatarMenu(false);
    };

    return (
        <TouchableWithoutFeedback onPress={() => { setIsAvatarMenu(false); Keyboard.dismiss(); }}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.background}>
                    
                    {/* Logo and Text on Blue Background */}
                    <View style={styles.logoContainer}>
                        <Image source={logo} resizeMode="contain" style={styles.logo} />
                        <Text style={styles.logoText}>Get started by creating your account!</Text>
                    </View>

                    <ScrollView>
                        <View style={styles.container}>
                            {isAvatarMenu && (
                                <TouchableOpacity style={styles.avatarMenu} activeOpacity={1} onPress={() => setIsAvatarMenu(false)}>
                                    <BlurView style={[styles.blurView, { width: screenWidth, height: screenHeight }]} tint='light' intensity={100}>
                                        <ScrollView contentContainerStyle={styles.avatarScrollContainer}>
                                            {avatars?.map((item) => (
                                                <TouchableOpacity onPress={() => handleAvatar(item)}
                                                    key={item._id} style={styles.avatarTouchable}>
                                                    <Image
                                                        source={{ uri: item?.image.asset.url }}
                                                        style={styles.avatarImage}
                                                        resizeMode='contain' />
                                                </TouchableOpacity>
                                            ))}
                                        </ScrollView>
                                    </BlurView>
                                </TouchableOpacity>
                            )}

                            {/* White Form Container */}
                            <View style={styles.formContainer}>
                                <View style={styles.inputContainer}>
                                    <View style={styles.avatarContainer}>
                                        <TouchableOpacity onPress={() => setIsAvatarMenu(true)}
                                            style={styles.avatarTouchable}>
                                            <Image
                                                source={{ uri: avatar }}
                                                resizeMode='contain'
                                                style={styles.avatarImage}
                                            />
                                            <View style={styles.editIconContainer}>
                                                <MaterialIcons name="edit" size={18} color={"#fff"} />
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                    <UserTextInput placeholder="Full Name" isPass={false} setStateValue={setName} />
                                    <UserTextInput placeholder="Email" isPass={false} setStateValue={setEmail} setGetEmailValidationStatus={setGetEmailValidationStatus} />
                                    <UserTextInput placeholder="Phone Number" isPass={false} setStateValue={setPhoneNumber} />
                                    <UserTextInput placeholder="Age" isPass={false} setStateValue={setAge} />

                                    <View style={styles.pickerContainer}>
                                        <Picker
                                            selectedValue={gender}
                                            onValueChange={(itemValue) => setGender(itemValue)}
                                            style={styles.picker}>
                                            <Picker.Item label="Select Gender" value=""/>
                                            <Picker.Item label="Male" value="male" />
                                            <Picker.Item label="Female" value="female" />
                                            <Picker.Item label="Other" value="other" />
                                        </Picker>
                                    </View>

                                    <UserTextInput placeholder="Password" isPass={true} setStateValue={setPassword} />

                                    <TouchableOpacity style={styles.signUpButton}>
                                        <Text style={styles.signUpText}>Sign Up</Text>
                                    </TouchableOpacity>

                                    <View style={styles.signInContainer}>
                                        <Text style={styles.signInText}>Have an account?</Text>
                                        <TouchableOpacity onPress={() => router.push("/sign-in")}>
                                            <Text style={styles.signInLink}>Sign In</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

export default SignUp;

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    background: { flex: 1, backgroundColor: '#38b6ff' },
    container: { flex: 1, alignItems: 'center' },

    // Logo and SignUp Text
    logoContainer: { 
        flexDirection: 'column', 
        alignItems: 'left', 
        justifyContent: 'left', 
        marginTop: 50,
        marginLeft: 20
    },
    logo: { 
        width: 80, 
        height: 80, 
        marginRight: 10 
    },
    logoText: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        color: 'white' 
    },

    // Form Container
    formContainer: { 
        width: '100%', 
        alignItems: 'center', 
        paddingTop: 20, 
        paddingHorizontal: 24, 
        backgroundColor: 'white', 
        borderTopLeftRadius: 70, 
        marginTop: 50
    },

    avatarMenu: { position: 'absolute', inset: 0, zIndex: 10, width: '100%', height: '100%' },
    blurView: { paddingHorizontal: 16, paddingVertical: 16, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
    avatarScrollContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
    avatarTouchable: { width: 80, height: 80, margin: 8, padding: 2, borderRadius: 50, borderWidth: 2, borderColor: '#03045E' },
    avatarImage: { width: '100%', height: '100%' },

    inputContainer: { width: '100%', alignItems: 'center' },
    pickerContainer: { width: '100%', borderWidth: 1, borderRadius: 8, marginVertical: 8 },
    picker: { height: 50, width: '100%' },

    signUpButton: { width: '100%', padding: 12, borderRadius: 8, backgroundColor: '#38b6ff', alignItems: 'center', marginVertical: 8 },
    signUpText: { color: 'white', fontSize: 18, fontWeight: 'bold' },

    signInContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
    signInText: { fontSize: 16 },
    signInLink: { fontSize: 16, fontWeight: 'bold', color: '#38b6ff' }
});
