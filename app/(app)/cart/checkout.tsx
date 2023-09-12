import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import tw from "../../../lib/tailwind";
import { Txt } from "../../../components/Txt";
import { AppContainer } from "../../../components/AppContainer";
import { Address, CartProduct, Order, OrderProduct } from "../../../src/models";
import { Auth, DataStore } from "aws-amplify";
import { router, useLocalSearchParams } from "expo-router";
import { Button } from "@aws-amplify/ui-react-native/dist/primitives";
import { Space } from "../../../components/Space";
import { Paystack, paystackProps } from "react-native-paystack-webview";
import { CardAddCheckout } from "../../../components/CardAddCheckout";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Checkout() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { totalPrice } = useLocalSearchParams();

  //console.log("totalPrice", totalPrice);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoading(true);
        console.log("fetching addresses");
        const userData = await Auth.currentAuthenticatedUser();
        const addresses = (await DataStore.query(Address)).filter(
          (addr) => addr.userSub === userData.attributes.sub
        );
        setAddresses(addresses);
        setLoading(false);
      } catch (error) {
        setError(error as any);
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();
  }, []);

  const address = addresses.find((addr) => addr.isSelected === true);

  const saveOrder = async () => {
    // get user details
    const userData = await Auth.currentAuthenticatedUser();
    // create a new order
    const newOrder = await DataStore.save(
      new Order({
        userSub: userData.attributes.sub,
        addressID: address?.id as string,
        amount: Number(totalPrice),
      })
    );

    // get all cart products
    const cartProducts = await DataStore.query(CartProduct, (cp) =>
      cp.userSub.eq(userData.attributes.sub)
    );

    // create a new order product for each cart product
    await Promise.all(
      cartProducts.map((cp) =>
        DataStore.save(
          new OrderProduct({
            quantity: cp.quantity,
            option: cp.option,
            productID: cp.productID,
            orderID: newOrder.id,
          })
        )
      )
    );

    // delete all cart products
    await Promise.all(cartProducts.map((cp) => DataStore.delete(cp)));

    // navigate to order confirmation screen
    // Todo
  };

  return (
    <AppContainer loading={loading}>
      <View style={tw`flex-1`}>
        <Txt
          title="Deliver to this Address"
          h4
          textStyle={{ marginVertical: 8 }}
        />
        <Space height={10} />
        <CardAddCheckout obj={address} />
        <Space height={60} />
        <View style={{ paddingTop: 60, backgroundColor: "#888" }}>
          <Paystack
            amount={Number(totalPrice)}
            paystackKey="pk_test_e10dba7e643757aaf5a1280e8d4c4538fb6318a8"
            billingEmail="test@gmail.com"
            billingName={address?.firstName + " " + address?.lastName}
            channels={["card", "bank", "ussd", "qr", "mobile_money"]}
            onCancel={(e) => {
              alert("Payment Error ");
              console.log(e);
            }}
            onSuccess={(e) => {
              alert("Payment Successful");
              saveOrder();
              console.log(e);
            }}
            autoStart={true}
          />
        </View>
      </View>
    </AppContainer>
  );
}
