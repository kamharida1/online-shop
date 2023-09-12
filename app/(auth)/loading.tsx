import { Auth } from "aws-amplify";
import { router } from "expo-router";
import { View } from "moti";
import { useEffect, useState } from "react";
import tw from "../../lib/tailwind";
import { ActivityIndicator } from "react-native";
import { primary } from "../../constants";

export default function Loading() {
  const [userToken, setUserToken] = useState<string | null>(null);


  useEffect(() => { 
    loadApp();
  }, []);

  // Get the logged in user and remember them
  async function loadApp() {
    await Auth.currentAuthenticatedUser()
    .then((user) => {
      setUserToken(user.signInUserSession.accessToken.jwtToken);
    }).catch((err) => console.log(err));
    router.push( userToken ? "/(app)/home" : "/(auth)/sign_in")
  } 

  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <ActivityIndicator animating size={60} color={primary} />
    </View>
  )
}