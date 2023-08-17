import { Text, View } from "react-native";
import * as SecureStore from 'expo-secure-store'
import { Button } from "../etc/button";
import { Button as CButton } from "../components/Button";
import { Redirect, useFocusEffect, useNavigation, useRouter } from "expo-router";
import { Space } from "../components/Space";
import Colors from "../constants/Colors";
import { useCallback, useEffect, useState } from "react";
import { Auth } from 'aws-amplify'
import { onScreen } from "../constants/Dimensions";
import { AppContainer } from "../components/AppContainer";

export default function Index() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const key = async (): Promise<void> => {
        
        try {
          setLoading(true);
          const email = await SecureStore.getItemAsync("authKeyEmail");
          const password = await SecureStore.getItemAsync("authKeyPassword");
          const credentials = { email, password };

          if (credentials) {
            // const { username, password } = credentials;
            const user = await Auth.signIn(email, password);
            user && router.push("/(tabs)/home");
            setLoading(false);
          } else {
            setLoading(false);
          }
        } catch (err) {
          console.log("error", err);
          setLoading(false);
        }
      };

      key();
    }, [])
  );

  return (
    <AppContainer loading={loading}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ marginBottom: 24, fontSize: 36, fontWeight: "bold" }}>
          Welcome
        </Text>
        <Button
          onPress={() => router.push(`/(auth)/sign-in`)}
          buttonStyle={{ backgroundColor: "dodgerblue", paddingHorizontal: 24 }}
          textStyle={{ fontSize: 24 }}
        >
          Sign In
        </Button>
        <Space height={15} />
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>OR</Text>
        <Space height={10} />
        <Button
          onPress={() => router.push(`/(auth)/sign_up`)}
          buttonStyle={{
            backgroundColor: Colors.light.danger,
            paddingHorizontal: 24,
          }}
          textStyle={{ fontSize: 24 }}
        >
          Sign Up
        </Button>
        <Space />
      </View>
    </AppContainer>
  );
}
