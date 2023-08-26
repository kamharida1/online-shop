import { Auth } from "aws-amplify";
import { useState } from "react";

import { AppContainer } from "../../../components/AppContainer";
import { useAuth } from "../../../context/authContext";
import { Button, Text } from "react-native";
import { useRouter } from "expo-router";

export default function Profile() {
  const { signOut, loading } = useAuth();

  const router = useRouter();

  const handleSignOut = async () => { 
    await Auth.signOut();
    router.push("/sign_in");
  }

  return (
    <AppContainer loading={loading}>
      <Text>Welcome, {}!</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </AppContainer>
  );
}
