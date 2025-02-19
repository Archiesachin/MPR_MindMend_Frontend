import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Dimensions, SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import logo from "../../assets/images/MindMend.png";
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

                        <View style={styles.formContainer}>
                            <Image
                                source={logo}
                                resizeMode='contain'
                                style={styles.bot} />
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
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

export default SignUp;

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    container: { flex: 1, alignItems: 'center', backgroundColor: 'white' },
    avatarMenu: { position: 'absolute', inset: 0, zIndex: 10, width: '100%', height: '100%' },
    blurView: { paddingHorizontal: 16, paddingVertical: 16, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
    avatarScrollContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
    avatarTouchable: { width: 80, height: 80, margin: 8, padding: 2, borderRadius: 50, borderWidth: 2, borderColor: '#03045E' },
    avatarImage: { width: '100%', height: '100%' },
    formContainer: { width: '100%', alignItems: 'center', paddingTop: 20, paddingHorizontal: 24 },
    bot: { width: 100, height: 120 },
    logo: { width: 140, height: 150 },
    inputContainer: { width: '100%', alignItems: 'center' },
    avatarContainer: { alignItems: 'center', marginVertical: 16 },
    editIconContainer: { position: 'absolute', top: 0, right: 0, width: 24, height: 24, backgroundColor: '#38b6ff', borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    pickerContainer: { width: '100%', borderWidth: 1, borderRadius: 8, marginVertical: 8 },
    picker: { height: 50, width: '100%' },
    signUpButton: { width: '100%', padding: 12, borderRadius: 8, backgroundColor: '#38b6ff', alignItems: 'center', marginVertical: 8 },
    signUpText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
    signInContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
    signInText: { fontSize: 16 },
    signInLink: { fontSize: 16, fontWeight: 'bold', color: '#38b6ff' }
});
