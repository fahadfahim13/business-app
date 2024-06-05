import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { PRIMARY } from "@/constants/Colors";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {

    useWarmUpBrowser();


    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
        console.log({createdSessionId, signIn, signUp, setActive});

      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", JSON.stringify(err));
    }
  }, []);

  return (
    <View>
      <View style={styles.subContainer}>
        <Image
          source={require("./../assets/images/react-logo.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.loginFullText}>
          Your Ultimate{" "}
          <Text style={styles.loginText}>Community Business Directory</Text> App
        </Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Let's Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    backgroundColor: "#fff",
    marginTop: 20,
    display: 'flex',
    alignItems: 'center'
  },
  loginText: {
    color: PRIMARY,
  },
  loginFullText: {
    fontSize: 30,
    textAlign: 'center',
    fontFamily: "Inter-light",
  },
  subContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 150,
  },
  image: {
    width: 190,
    height: 400,
    borderRadius: 20,
    borderWidth: 8,
    borderColor: "#000",
  },
  button: {
    marginTop: 20,
    backgroundColor: PRIMARY,
    padding: 16,
    width: '80%',
    borderRadius: 16,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Inter-bold'
  }
});

export default LoginScreen;
