import { Stack } from "expo-router";

export default function CartLayout() {
  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        headerBlurEffect: "systemMaterialLight",
      }}
    />
  );
}
