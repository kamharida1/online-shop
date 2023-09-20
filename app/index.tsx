import { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { Auth } from "aws-amplify";
import { router } from "expo-router";
import { AppContainer } from "../components/AppContainer";
import { Space } from "../components/Space";
import { Button } from "react-native";

const Index = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const key = async (): Promise<void> => {
      try {
        const email = await SecureStore.getItemAsync('authKeyEmail')
        const password = await SecureStore.getItemAsync('authKeyPassword')
        const credentials = { email, password }
        
        if (credentials) {
          // const { email, password } = credentials;
          // const user = await Auth.signIn(email as string, password as string);
          router.replace('/(app)/home/main')
          setLoading(false);
        } else {
          setLoading(false);
        }
        // const user = await Auth.currentAuthenticatedUser();
        // setLoading(false);
        // user && router.push('/(app)/home')
      } catch (err) {
        console.log('error', err);
        setLoading(false);
      }
    };
    key();
  }, []);
  return (
    <AppContainer loading={loading}>
      <Space height={80} />
      <Button title="Sign In" onPress={() => router.push('/(auth)/sign_in')} />
      <Space height={20} />
      <Button title="Sign Up" onPress={() => router.push('/(auth)/sign_up')} />
    </AppContainer>
  )
 };

export default Index;