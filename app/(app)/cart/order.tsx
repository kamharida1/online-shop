import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from "lottie-react-native";


export default function Order() {
  useEffect(() => {
    setTimeout(() => {
      router.push('/(app)/home/main');
      //router.push('/cart/');
    }, 5000)
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <LottieView
        source={require("../../../assets/lottie/checked-done.json")}
        autoPlay
        loop={false}
        speed={0.7}
        style={{
          width: 300,
          height: 260,
          alignSelf: "center",
          marginTop: 40,
          justifyContent: "center",
        }}
      />
      <Text
        style={{
          marginTop: 20,
          fontSize: 19,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Your Order Has been Recieved
      </Text>
      <LottieView
        source={require("../../../assets/lottie/sparkle.json")}
        style={{
          height: 300,
          position: "absolute",
          top: 100,
          width: 300,
          alignSelf: "center",
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />
    </SafeAreaView>
  );
}