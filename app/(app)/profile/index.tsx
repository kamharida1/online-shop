import { Auth, DataStore } from "aws-amplify";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

import { AppContainer } from "../../../components/AppContainer";
import { useAuth } from "../../../context/authContext";
import { Button, RefreshControl, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Txt } from "../../../components/Txt";
import { Space } from "../../../components/Space";
import { Order, OrderProduct } from "../../../src/models";
import { ref } from "yup";
import tw from "../../../lib/tailwind";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);

  const router = useRouter();

  useEffect(() => {
    refetch();
    const subscription = DataStore.observe(Order).subscribe((msg) => refetch());
    return subscription.unsubscribe();
  }, []);

  async function refetch() {
    const userData = await Auth.currentAuthenticatedUser();
    DataStore.query(Order, (cp) => cp.userSub.eq(userData.attributes.sub)).then(
      setOrders
    );
  }

  //console.log("orders", orders);

  async function openReceipt(orderId: string) {
    const order = await DataStore.query(Order, orderId);
    // const allItems = await DataStore.query(OrderProduct);
    // const items = allItems && allItems.filter(item => item.orderID && item.orderID === orderId);
    //console.log("items", items);
    return router.push({
      pathname: "/(app)/profile/receipt",
      params: { orderID: order?.id as string },
    });
    // // router.push("/receipt", { orderID: order.id });
  }

  // openReceipt("98924c0a-aef3-4f8e-b51b-35328d46a83d");

  const handleSignOut = async (): Promise<void> => {
    setLoading(true);
    try {
      await Auth.signOut();
      await SecureStore.deleteItemAsync("authKeyPassword");
      await SecureStore.deleteItemAsync("authKeyEmail");
      setLoading(false);
      router.push("/(auth)/sign_in");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const orderList = orders.map((order) => (
    <Button
      key={order.id}
      title={`Order: ${order.id}`}
      onPress={() => openReceipt(order.id as string)}
    />
  ));

  return (
    <AppContainer style={{ paddingTop: 80 }} loading={loading}>
      <Stack.Screen
        options={{
          title: "Profile",
          headerShown: true,
          headerLargeTitle: true,
        }}
      />

      <Space height={12} />
      <Txt h1 title="Orders" />
      <Space height={8} />
      {orderList}
      <Button title="Sign Out" onPress={handleSignOut} />
    </AppContainer>
  );
}
