import { Link, Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Button, Platform, Pressable } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Toast from "react-native-root-toast";

import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { Text } from "react-native";
import { DataStore } from "aws-amplify";

export default function HomeLayout() {
  const router = useRouter();

  async function clearDataStore() {
    await DataStore.clear();
    Toast.show("Storage cleared, pull to refresh", {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM + 1,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  }

  function ClearData() {
    const router = useRouter();

    return (
      // <Pressable
      //   style={{
      //     flexDirection: "row",
      //     display: "flex",
      //     alignItems: "center",
          
      //   }}
      //   onPress={() => clearDataStore()}
      // >
      //   <Text
      //     style={{
      //       fontWeight: "normal",
      //       fontSize: 16,
      //     }}
      //   >
      //     Clear Datastore
      //   </Text>
       
      // </Pressable>
      <Button title="Clear Datastore" onPress={clearDataStore} />
    );
  }

  return (
    <>
      <Stack
        screenOptions={
          {
            //headerRight: SignOutButton,
          }
        }
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Products",
            headerRight: ComposeButton,
            headerLeft: ClearData,
            headerLargeTitle: true,
            headerSearchBarOptions: {
              onChangeText: (event) => {
                // Update the query params to match the search query.
                router.setParams({
                  q: event.nativeEvent.text,
                });
              },
            },
          }}
        />
        <Stack.Screen
          name="compose"
          options={{
            title: "Create a new product",
            presentation: "modal",
            headerRight: Platform.select({
              ios: DismissComposeButton,
            }),
          }}
        />
      </Stack>
    </>
  );
}

function ComposeButton() {
  const router = useRouter();

  return (
    <Link
      href="/(app)/home/compose"
      onPress={(ev) => {
        ev.preventDefault();
        router.push("/(app)/home/compose");
      }}
      asChild
    >
      <Pressable
        style={{
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          paddingRight: 8,
        }}
      >
        <Text
          style={{
            fontWeight: "normal",
            paddingHorizontal: 8,
            fontSize: 16,
          }}
        >
          Add Product
        </Text>
        <FontAwesome5 name="arrow-circle-right" size={24} color="black" />
      </Pressable>
    </Link>
  );
}


function DismissComposeButton() {
  return (
    <Link href="..">
      <Text
        style={{
          fontWeight: "normal",
          paddingHorizontal: 8,
          fontSize: 16,
        }}
      >
        Back
      </Text>
    </Link>
  );
}
