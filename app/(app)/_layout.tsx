import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import  MaterialCommunityIcons  from "@expo/vector-icons/MaterialCommunityIcons";
import { dimGray, tint } from "../../constants";
import { StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
}) {
  return <MaterialCommunityIcons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: tint || "#224499",
        tabBarInactiveTintColor: dimGray || "#777",
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "rgba(200,200,200, 0.5)",
        },
        tabBarBackground: () => (
          <BlurView
            tint="light"
            intensity={30}
            style={StyleSheet.absoluteFill}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Products",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          // headerRight: () => (
          //   <Link href="/compose" asChild>
          //     <Pressable style={tw`flex-row items-center`}>
          //       {({ pressed }) => (
          //         <>
          //           <Txt
          //             body3
          //             title="Add Product"
          //             textStyle={tw`mr-2`}
          //           />
          //           <FontAwesome
          //             name="plus"
          //             size={23}
          //             color="#555"
          //             style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          //           />
          //         </>
          //       )}
          //     </Pressable>
          //   </Link>
          // ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color }) => <TabBarIcon name="cart-arrow-down" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="account" color={color} />,
        }}
      />
    </Tabs>
  );
}
