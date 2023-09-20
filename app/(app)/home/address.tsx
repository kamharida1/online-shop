import { useCallback, useEffect, useState } from "react";
import { Address, LazyAddress } from "../../../src/models";
import { Stack, useLocalSearchParams } from "expo-router";
import { useDataStore } from "../../../hooks/useDataStore";
import { Auth, DataStore } from "aws-amplify";
import { AppContainer } from "../../../components/AppContainer";
import FormAddress from "../../../components/FormAddress.tsx";
import tw from "../../../lib/tailwind";
import useAddressWithObservation from "../../../hooks/useAddressWithObservation";
import { set } from "lodash";
import FormAdd from "../../../components/FormAdd";

export default function AddAddress() {
  const [myAddress, setMyAddress] = useState<Address>(null as any);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { address } = useLocalSearchParams<{ address: string }>();

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
  }, []);

  useEffect(() => {
    const hasAddress = addresses.length > 0;
    //console.log("hasAddress", hasAddress, addresses);
    const myAddress = addresses.find((addr: any) => addr.id === address);
    if (!myAddress) {
      return;
    }
    setMyAddress(myAddress);
    //console.log("myAddress", myAddress);
  }, [addresses]);

  return (
    <AppContainer loading={loading}>
      <Stack.Screen options={{ title: "Add Address" }} />
      <>
        {/* <FormAddress myAddress={myAddress} /> */}
        <FormAdd myAddress={myAddress} />
      </>
    </AppContainer>
  );
}
