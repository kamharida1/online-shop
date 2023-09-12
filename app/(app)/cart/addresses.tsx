import { useEffect, useState } from "react";
import { Address, LazyAddress } from "../../../src/models";
import { Auth, DataStore } from "aws-amplify";
import { View } from "moti";
import { Stack, router, useRouter } from "expo-router";
import tw from "../../../lib/tailwind";
import { Txt } from "../../../components/Txt";
import { FlatList, Pressable } from "react-native";
import CardAddress from "../../../components/CardAddress";
import { Button } from "@aws-amplify/ui-react-native/dist/primitives";
import { FontAwesome } from "@expo/vector-icons";
import { string } from "yup";

function AddressButton() {
  const router = useRouter();
  return (
    <Pressable
      style={{
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        paddingRight: 8,
      }}
      onPress={() =>
        router.push({
          pathname: "/(app)/cart/[address]",
          params: null as any,
        })
      }
    >
      <Txt
        h4
        title="Add Address"
        textStyle={tw` text-[#b8147e] mr-2 text-lg font-bold`}
      />
      <FontAwesome name="angle-double-right" size={24} color="#b8147e" />
    </Pressable>
  );
}

export default function AddressList() {
  const [addresses, setAddresses] = useState<LazyAddress[]>([]);
  const [userSub, setUserSub] = useState<string>("");
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch the user's sub when the component mounts
  useEffect(() => {
    fetchUserSub();
  }, []);

  async function fetchUserSub() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setUserSub(user.attributes.sub);
    } catch (error) {
      console.error("Error fetching user sub: ", error);
    }
  }

  // Fetch addresses from DataStore when userSub changes
  useEffect(() => {
    if (userSub) {
      fetchAddresses();
    }
  }, [userSub]);

  // Fetch addresses and update state
  async function fetchAddresses() {
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
    <View style={tw`flex-1 bg-white`}>
      <Stack.Screen
        options={{
          title: "Address List",
          headerRight: () => <AddressButton />,
          headerBackVisible: false,
        }}
      />
      {addresses.length !== 0 ? (
        <FlatList
          data={addresses}
          renderItem={({ item }) => (
            <CardAddress
              address={item}
              onPress={() => selectAddress(item.id)}
              isSelected={selectedAddressId === item.id}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View style={tw`flex-1 items-center justify-center`}>
          <Txt
            h3
            title="You have not added any address yet."
            textStyle={tw`text-2xl font-bold text-center`}
          />
          <Button
            onPress={() =>
              router.push({
                pathname: "/(app)/cart/[address]",
                params: { address: "" },
              })
            }
          >
            <Txt title="Add Address" textStyle={tw`text-lg font-bold`} />
          </Button>
        </View>
      )}
    </View>
  );
}
