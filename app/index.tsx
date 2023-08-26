import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "../lib/tailwind";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { Auth } from "aws-amplify";
import { useFocusEffect, useRouter } from "expo-router";

export default function App() {
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useAuth();

  const router = useRouter();
  useEffect(() => {
    setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    // }, 2000);
    const userOk = async (): Promise<void> => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        if (user) {
          router.replace('/(app)/home/')
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
     };
    userOk();
  },[])
  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center`}>
      <Text>App</Text>
    </SafeAreaView>
  );
}
