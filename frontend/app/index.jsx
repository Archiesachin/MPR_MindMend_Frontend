import { Link, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";
import { useLayoutEffect } from "react";

export default function App() {
  // const { user, token } = useContext(AuthContext);
  const router = useRouter();

  return (
      <View style={styles.container}>
        <LottieView
          source={require("../assets/splash2.json")}
          style={styles.animation}
          autoPlay
          loop={false}
          onAnimationFinish={() => {
            router.push("/sign-in");
          }}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  animation: {
    width: "100%",
    height: "100%",
  },
});
