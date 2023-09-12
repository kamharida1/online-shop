import { SafeAreaView, Text, View } from "moti";
import tw from "../../../lib/tailwind";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Order, OrderProduct, Product } from "../../../src/models";
import { DataStore } from "aws-amplify";
import { CardOrderItem } from "../../../components/CardOrderItem";
import { Txt } from "../../../components/Txt";
import { AppContainer } from "../../../components/AppContainer";

export default function Receipt() {
  const [order, setOrder] = useState<Order | undefined>(undefined);
  const [orderProducts, setOrderProducts] = useState<OrderProduct[]>([]);

  const { orderID } = useLocalSearchParams();

  useEffect(() => {
    DataStore.query(Order, orderID as string).then(setOrder);
  }, [orderID]);

  useEffect(() => {
    DataStore.query(OrderProduct, (op) =>
      op.orderID.eq(orderID as string)
    ).then(setOrderProducts);
  }, []);

  const orderItemList = orderProducts.map((op) => (
    <CardOrderItem key={op.id} orderItem={op} />
  ));

  return (
    <SafeAreaView>
      <AppContainer>
        <Stack.Screen options={{ title: "Receipt" }} />
        {/* <Text>{order?.amount}</Text> */}
        <Txt
          h2
          title={`Total:  ${order?.amount}`}
          textStyle={{ marginVertical: 12 }}
        />
        {orderItemList}
      </AppContainer>
    </SafeAreaView>
  );
}
