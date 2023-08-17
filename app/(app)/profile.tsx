import { Auth } from "aws-amplify";
import { useState } from "react";

import { AppContainer } from "../../components/AppContainer";
import { useAuth } from "../../context/authContext";
import { Button, Text } from "react-native";

export default function Profile() {
    const { user, signOut, loading } = useAuth();

  return (
    <AppContainer loading={loading}>
      <Text>Welcome, {}!</Text>
      <Button title="Sign Out" onPress={signOut} />
    </AppContainer>
  );
}
