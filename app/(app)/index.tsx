import { StyleSheet } from "react-native";
import EditScreenInfo from "../../components/EditScreenInfo";
import { View, Text } from "../../components/Themed";
import { Redirect, useRootNavigationState } from "expo-router";
import { Txt } from "../../components/Txt";
import { Button } from "../../components/Button";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      <Txt
        button
        title="Discover Everything"
        textStyle={{ color: "black", fontSize: 24 }}
      />
      <Button
        theme="primary"
        title="Loader"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    //justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
