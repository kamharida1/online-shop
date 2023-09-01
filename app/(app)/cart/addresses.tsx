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

export default function AddressList() {
  const [addresses, setAddresses] = useState<LazyAddress[]>([]);  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => { 
    const fetchAddresses = async () => {
      try {
        setLoading(true);
        // console.log("fetching addresses");
        const userData = await Auth.currentAuthenticatedUser();
        const addresses = (await DataStore.query(Address)).filter(
          (addr) => addr.userSub === userData.attributes.sub
        );
        setAddresses(addresses);
        //console.log("addresses", addresses);
        setLoading(false);
      } catch (error) {
        setError(error as any);
        //setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();

    const subscription = DataStore.observe(Address).subscribe(() => fetchAddresses());  
    return () => subscription.unsubscribe();
  }, []);

   const selectAddress = async (address: LazyAddress) => {
     const original = await DataStore.query(Address, address.id);
     const updated = Address.copyOf(original as LazyAddress, (updated) => {
       updated.isSelected = true;
     });
     await DataStore.save(updated);
   };

  return (
    <View style={tw`flex-1 bg-white mt-12`}>
      <Stack.Screen options={{ title: "Address List" }} />
      {addresses.length !== 0 ? (
        <FlatList
          data={addresses}
          renderItem={({ item }) => (
            <CardAddress
              address={item}
              onPress={() => selectAddress(item)}
              isSelected={item.isSelected || false}
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