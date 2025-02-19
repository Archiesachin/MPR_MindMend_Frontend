import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { Entypo, MaterialIcons } from '@expo/vector-icons';

const UserTextInput = ({ placeholder, isPass, setStateValue, setGetEmailValidationStatus }) => {
    const [value, setValue] = useState("");
    const [showPass, setShowPass] = useState(true);
    const [icon, setIcon] = useState(null);
    const [isEmailValid, setIsEmailValid] = useState(true);

    const handleTextChange = (text) => {
        setValue(text);
        setStateValue(text);

        if (placeholder === 'Email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const status = emailRegex.test(text);
            setIsEmailValid(status);
            setGetEmailValidationStatus(status);
        }
    };

    useLayoutEffect(() => {
        switch (placeholder) {
            case "Full Name":
                setIcon("person");
                break;
            case "Email":
                setIcon("email");
                break;
            case "Password":
                setIcon("lock");
                break;
            case "Age":
                setIcon("face");
                break;
            case "Phone Number":
                setIcon("phone");
                break;
            default:
                break;
        }
    }, []);

    return (
        <View style={[styles.inputContainer, !isEmailValid && placeholder === "Email" && value.length > 0 ? styles.invalidInput : styles.validInput]}>
            <MaterialIcons name={icon} size={24} color={"#6c6d83"} />
            <TextInput
                style={styles.textInput}
                placeholder={placeholder}
                value={value}
                onChangeText={handleTextChange}
                secureTextEntry={isPass && showPass}
                autoCapitalize="none"
            />
            {isPass && (
                <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                    <Entypo name={showPass ? "eye" : "eye-with-line"} size={24} color={"#6c6d83"} />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 8,
    },
    validInput: {
        borderColor: 'gray',
    },
    invalidInput: {
        borderColor: 'red',
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
});

export default UserTextInput;