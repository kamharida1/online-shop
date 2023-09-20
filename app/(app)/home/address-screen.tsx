import { View, Text, ScrollView, Pressable, TextInput } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Address, LazyAddress } from '../../../src/models';
import { Auth, DataStore } from 'aws-amplify';
import { Stack, router, useFocusEffect } from 'expo-router';
import { AntDesign, Entypo, Feather, MaterialIcons } from '@expo/vector-icons';

export default function AddressScreen() {
  const [addresses, setAddresses] = useState<LazyAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //refresh the addresses when the component comes to the focus ie basically when we navigate back
  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, [])
  );
  console.log("addresses", addresses);

  // Fetch addresses and update state
  async function fetchAddresses() {
    const user = await Auth.currentAuthenticatedUser();
    const userSub = user.attributes.sub;
    const userAddresses = await DataStore.query(Address, (address) =>
      address.userSub.eq(userSub)
    );
    setAddresses(userAddresses);
  }

  const selectAddress = async (addressId: string) => {
    if (selectedAddressId !== addressId) {
      // Deselect the previously selected address if one was selected
      if (selectedAddressId) {
        const original = await DataStore.query(Address, selectedAddressId);
        const updated = Address.copyOf(original as LazyAddress, (updated) => {
          updated.isSelected = false;
        });
        await DataStore.save(updated);
      }
    }

    // Select the new address
    const original = await DataStore.query(Address, addressId);
    const updated = Address.copyOf(original as LazyAddress, (updated) => {
      updated.isSelected = true;
    });
    await DataStore.save(updated);

    // Update the UI
    setSelectedAddressId(addressId);
    //router.push(`/(app)/cart/checkout`);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 50 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <View
        style={{
          backgroundColor: "#00CED1",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "#fff",
            borderRadius: 3,
            height: 38,
            flex: 1,
          }}
        >
          <AntDesign
            style={{ paddingLeft: 10 }}
            name="search1"
            size={24}
            color="black"
          />
          <TextInput placeholder="Search Agubrothers.in" />
        </Pressable>

        <Feather name="mic" size={24} color="black" />
      </View>

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Your Addresses</Text>

        <Pressable
          onPress={() =>
            router.push({
              pathname: "/(app)/home/address",
              params: { address: "" },
            })
          }
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            paddingVertical: 10,
            paddingHorizontal: 5,
          }}
        >
          <Text> Add a new Address</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </Pressable>

        <Pressable>
          {/* all the added addresses */}
          {addresses.map((address) => (
            <Pressable
              key={address.id}
              style={{
                borderWidth: 1,
                borderColor: "#D0D0D0",
                padding: 10,
                flexDirection: "column",
                gap: 5,
                marginVertical: 10,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
              >
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  {address.firstName} {address.lastName}
                </Text>
                <Entypo name="location-pin" size={24} color="red" />
              </View>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                {address.street},{"\n"}
                {address.street2}
              </Text>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                {address.city} - {address.state}
              </Text>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                phone No : {address.phone}
              </Text>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                pin code : {address.postalCode}
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
                  onPress={() =>
                    router.push({
                      pathname: "/(app)/home/address",
                      params: { address: address.id},
                    })
                  }
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
                  <Text>Remove</Text>
                </Pressable>

                <Pressable
                  onPress={() => selectAddress(address.id)}
                  style={{
                    backgroundColor: "#F5F5F5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#D0D0D0",
                  }}
                >
                  <Text>Set as Default</Text>
                </Pressable>
              </View>
            </Pressable>
          ))}
        </Pressable>
      </View>
    </ScrollView>
  );

}