import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import tw from "../../../lib/tailwind";
import { Txt } from "../../../components/Txt";
import { AppContainer } from "../../../components/AppContainer";
import { Address, CartProduct, Order, OrderProduct } from "../../../src/models";
import { Auth, DataStore } from "aws-amplify";
import {  Stack, router, useLocalSearchParams } from "expo-router";
import { Space } from "../../../components/Space";
import { Paystack, paystackProps } from "react-native-paystack-webview";
import { CardAddCheckout } from "../../../components/CardAddCheckout";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { cleanCart } from "../../../redux/cartSlice";
import { Entypo, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import formatPrice from "../../../utils/naira_price";

export default function Confirm() {
  const steps = [
    { title: "Address", content: "Address Form" },
    { title: "Delivery", content: "Delivery Options" },
    { title: "Payment", content: "Payment Details" },
    { title: "Place Order", content: "Order Summary" },
  ];
  
  const [currentStep, setCurrentStep] = useState(0);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useAppDispatch();

  const cartProducts = useAppSelector((state) => state.cart.cart);
  const total = cartProducts
    ?.map((item) => item.product.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

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

  const [selectedAddress, setSelectedAdress] = useState<Address | undefined>(undefined);
  const [option, setOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  // const address = addresses.find((addr) => addr.isSelected === true);

  const saveOrder = async () => {
    // get user details
    const userData = await Auth.currentAuthenticatedUser();
    // create a new order
    const newOrder = await DataStore.save(
      new Order({
        userSub: userData.attributes.sub,
        addressID: selectedAddress?.id as string,
        amount: total,
      })
    );

    // get all cart products
    // const cartProducts = await DataStore.query(CartProduct, (cp) =>
    //   cp.userSub.eq(userData.attributes.sub)
    // 


    // create a new order product for each cart product
    await Promise.all(
      cartProducts.map((cp) =>
        DataStore.save(
          new OrderProduct({
            quantity: cp.quantity,
            productID: cp.product.id,
            orderID: newOrder.id,
          })
        )
      )
    );

    // delete all cart products
    // await Promise.all(cartProducts.map((cp) => DataStore.delete(cp)));
    dispatch(cleanCart());
    router.push('/(app)/cart/order')
  };

  const pay = () => (
    <View style={{ paddingTop: 60, backgroundColor: "#888" }}>
      <Paystack
        amount={total}
        paystackKey="pk_test_e10dba7e643757aaf5a1280e8d4c4538fb6318a8"
        billingEmail="test@gmail.com"
        billingName={
          selectedAddress?.firstName + " " + selectedAddress?.lastName
        }
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
  );

  //const address = addresses.find((addr) => addr.isSelected === true);
  return (
    <ScrollView style={{ marginTop: 55 }}>
      <Stack.Screen options={{ title: "Confirm Order" }} />
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          {steps?.map((step, index) => (
            <View
              key={index}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              {index > 0 && (
                <View
                  style={[
                    { flex: 1, height: 1, backgroundColor: "green" },
                    index <= currentStep && { backgroundColor: "green" },
                  ]}
                />
              )}
              <View
                style={[
                  {
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: "#ccc",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  index < currentStep && { backgroundColor: "green" },
                ]}
              >
                {index < currentStep ? (
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    &#10003;
                  </Text>
                ) : (
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text style={{ textAlign: "center", marginTop: 8 }}>
                {step.title}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {currentStep === 0 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Select Delivery Address
          </Text>

          <Pressable>
            {addresses?.map((address, index) => (
              <Pressable
                key={index}
                style={{
                  borderWidth: 1,
                  borderColor: "#D0D0D0",
                  padding: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  paddingBottom: 17,
                  marginVertical: 7,
                  borderRadius: 6,
                }}
              >
                {selectedAddress && selectedAddress.id === address?.id ? (
                  <FontAwesome5 name="" size={20} color="#008397" />
                ) : (
                  <Entypo
                    onPress={() => setSelectedAdress(address)}
                    name="circle"
                    size={20}
                    color="#D0D0D0"
                  />
                )}

                <View style={{ marginLeft: 6 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                      {address?.firstName} {address?.lastName}
                    </Text>
                    <Entypo name="location-pin" size={24} color="red" />
                  </View>

                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    {address?.street}, {address?.street2}
                  </Text>
                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    {address?.city}, {address?.state}
                  </Text>
                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    phone No : {address?.phone}
                  </Text>
                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    pin code : {address?.postalCode}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                      marginTop: 7,
                    }}
                  >
                    <Pressable
                      style={{
                        backgroundColor: "#F5F5F5",
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 5,
                        borderWidth: 0.9,
                        borderColor: "#D0D0D0",
                      }}
                    >
                      <Text> Edit </Text>
                    </Pressable>

                    <Pressable
                      style={{
                        backgroundColor: "#F5F5F5",
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 5,
                        borderWidth: 0.9,
                        borderColor: "#D0D0D0",
                      }}
                    >
                      <Text> Remove </Text>
                    </Pressable>

                    <Pressable
                      style={{
                        backgroundColor: "#F5F5F5",
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 5,
                        borderWidth: 0.9,
                        borderColor: "#D0D0D0",
                      }}
                    >
                      <Text> Set as Default </Text>
                    </Pressable>
                  </View>

                  <View>
                    {selectedAddress && selectedAddress.id === address?.id && (
                      <Pressable
                        onPress={() => setCurrentStep(1)}
                        style={{
                          backgroundColor: "#008397",
                          padding: 10,
                          borderRadius: 20,
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: 10,
                        }}
                      >
                        <Text style={{ textAlign: "center", color: "white" }}>
                          Deliver to this Address
                        </Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              </Pressable>
            ))}
          </Pressable>
        </View>
      )}

      {currentStep === 1 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20 }}>Choose your delivery options</Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              padding: 8,
              gap: 7,
              marginTop: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
            }}
          >
            {option ? (
              <FontAwesome5 name="dot-circle" size={20} color="#008397" />
            ) : (
              <Entypo
                onPress={() => setOption(!option)}
                name="circle"
                size={20}
                color="gray"
              />
            )}

            <Text style={{ flex: 1 }}>
              <Text style={{ color: "green", fontWeight: "500" }}>
                Tomorrow by 10pm
              </Text>{" "}
              - Free delivery with your Prime membership
            </Text>
          </View>

          <Pressable
            onPress={() => setCurrentStep(2)}
            style={{
              backgroundColor: "#FFC72C",
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Text>Continue</Text>
          </Pressable>
        </View>
      )}

      {currentStep === 2 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Select your Payment Method
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              padding: 8,
              gap: 7,
              marginTop: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
            }}
          >
            {selectedOption === "cash" ? (
              <FontAwesome5 name="dot-circle" size={20} color="#008397" />
            ) : (
              <Entypo
                onPress={() => setSelectedOption("cash")}
                name="circle"
                size={20}
                color="gray"
              />
            )}

            <Text>Cash on Delivery</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              padding: 8,
              gap: 7,
              marginTop: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
            }}
          >
            {selectedOption === "card" ? (
              <FontAwesome5 name="dot-circle" size={20} color="#008397" />
            ) : (
              <Entypo
                onPress={() => {
                  setSelectedOption("card");
                  Alert.alert("Debit card", "Pay Online", [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    { text: "OK", onPress: () => pay() },
                  ]);
                }}
                name="circle"
                size={20}
                color="gray"
              />
            )}

            <Text>Credit or debit card </Text>
          </View>
          <Pressable
            onPress={() => setCurrentStep(3)}
            style={{
              backgroundColor: "#FFC72C",
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Text>Continue</Text>
          </Pressable>
        </View>
      )}

      {currentStep === 3 && selectedOption === "cash" && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Order Now</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
              alignItems: "center",
              gap: 8,
              backgroundColor: "white",
              padding: 8,
              borderColor: "#D0D0D0",
              borderWidth: 1,
            }}
          >
            <View>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                Save 5% and never run out
              </Text>
              <Text style={{ fontSize: 15, color: "gray", marginTop: 5 }}>
                Get regular delivery of this item and save 5.0%{" "}
              </Text>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </View>

          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <Text> Shipping to {selectedAddress?.firstName}</Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 8,
                alignItems: "center",
                // gap: 8,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>
                Items
              </Text>

              <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>
                {formatPrice(total)}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 8,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>
                Delivery
              </Text>

              <Text style={{ fontSize: 16, color: "gray" }}>
                {formatPrice(0)}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 8,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "500" }}>
                Order Total
              </Text>

              <Text
                style={{ color: "#C60C30", fontSize: 17, fontWeight: "bold" }}
              >
                {formatPrice(Number(total))}
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 16, color: "gray" }}>Pay With</Text>

            <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 7 }}>
              Pay on Delivery (Cash)
            </Text>
          </View>

          <Pressable
            onPress={saveOrder}
            style={{
              backgroundColor: "#FFC72C",
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text>Place your order</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
