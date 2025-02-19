import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import hero from '../../assets/images/hero-bg.png'
import logo from '../../assets/images/MindMend.png'
import UserTextInput from '../../components/UserTextInput';
import { useRouter, useNavigation } from 'expo-router';


const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getEmailValidationStatus, setGetEmailValidationStatus] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const navigation = useNavigation();
  const router = useRouter();


//   const handleLogin = async () => {
//     if (getEmailValidationStatus && email !== "") {
//       await signInWithEmailAndPassword(firebaseAuth, email, password)
//         .then(userCred => {
//           if (userCred) {
//             console.log("User ID:", userCred?.user.uid);
//             getDoc(doc(firestoreDB, 'users', userCred?.user.uid)).then(docSnap => {
//               if (docSnap.exists()) {
//                 console.log("User Data:", docSnap.data());
//                 dispatch(SET_USER(docSnap.data()));
//                 router.push("/home");
//               }
//             });
//           }
//         })
//         .catch(err => {
//           console.log("Error", err.message);
//           if (err.message.includes("wrong-password")) {
//             setAlert(true);
//             setAlertMessage("Wrong Password");
//           } else if (err.message.includes("user-not-found")) {
//             setAlert(true);
//             setAlertMessage("User Does not Exist");
//             setTimeout(() => setAlert(false), 2000);
//           } else {
//             setAlert(true);
//             setAlertMessage("Invalid Email");
//           }
//           setTimeout(() => setAlert(false), 2000);
//         });
//     }
//   };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.innerContainer}>
          <Image source={hero} resizeMode="cover" style={styles.heroImage} />

          <View style={styles.formContainer}>
            <Image source={logo} resizeMode="contain" style={styles.logo} />

            {alert && <Text style={styles.alertText}>{alertMessage}</Text>}

            <UserTextInput
              placeholder="Email"
              isPass={false}
              setStateValue={setEmail}
              setGetEmailValidationStatus={setGetEmailValidationStatus}
            />
            <UserTextInput placeholder="Password" isPass={true} setStateValue={setPassword} />

            <TouchableOpacity  style={styles.signInButton}>
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>

            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("sign-up")}>
                <Text style={styles.signUpLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'start',
    backgroundColor: 'white',
    height: '100%',
  },
  heroImage: {
    height: 240, // 96 in Tailwind
    width: '100%',
  },
  formContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 90,
    marginTop: -70,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  logo: {
    width: 140,
    height: 150,
  },
  alertText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 10,
  },
  signInButton: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#38b6ff', // Secondary color
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
  },
  signUpContainer: {
    width: '100%',
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpText: {
    fontSize: 16,
    color: '#333',
  },
  signUpLink: {
    fontSize: 16,
    fontWeight: '600',
    color: '#38b6ff',
    marginLeft: 4,
  },
});
