import "react-native-gesture-handler";
import "@azure/core-asynciterator-polyfill";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Provider as ReduxProvider } from "react-redux";

import { useFonts } from "expo-font";
import { Slot, SplashScreen, Stack, Tabs } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { ExpoSQLiteAdapter } from "@aws-amplify/datastore-storage-adapter/ExpoSQLiteAdapter";

import { Provider } from "../context/authContext";
import { Amplify, DataStore } from "aws-amplify";

import config from "../src/aws-exports";
Amplify.configure(config);

DataStore.configure({
  storageAdapter: ExpoSQLiteAdapter,
});



export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(/)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
    AirBold: require("../assets/fonts/AirbnbCereal_W_Bd.otf"),
    AirBlack: require("../assets/fonts/AirbnbCereal_W_Bk.otf"),
    AirBoldBlack: require("../assets/fonts/AirbnbCereal_W_Blk.otf"),
    AirLight: require("../assets/fonts/AirbnbCereal_W_Lt.otf"),
    AirMedium: require("../assets/fonts/AirbnbCereal_W_Md.otf"),
    AirExtraBold: require("../assets/fonts/AirbnbCereal_W_XBd.otf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    
      <Provider>

        {/* <Stack screenOptions={{}}>
          <Stack.Screen name="(app)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack> */}
        <Slot />
      </Provider>
  );
}
