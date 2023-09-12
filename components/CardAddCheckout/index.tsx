import { Text, View } from "moti";
import { memo } from "react";
import { Txt } from "../Txt";
import { Space } from "../Space";
import { Button } from "@aws-amplify/ui-react-native/dist/primitives";
import { router } from "expo-router";
import tw from "../../lib/tailwind";
import { LazyAddress } from "../../src/models";

interface CardAddCheckoutT {
  obj?: LazyAddress
}

const CardAddCheckout = memo<CardAddCheckoutT>(({ obj }) => {
  if (!obj) {
    return null; // or some fallback JSX if needed
  }
  const { id, firstName, lastName, street, street2, city, state, } = obj
  return (
    <View>
      {id ? (
        <View
          style={tw`items-center justify-center p-2 shadow-md bg-[#b8147e]`}
        >
          <Txt
            h4
            title={`${firstName} ${lastName}`}
            textStyle={{ color: "#fff", marginTop: 2 }}
          />
          <Txt
            h4
            title={`${street} ${street2},  ${city} ${state}`}
            textStyle={{ color: "#fff", marginTop: 2 }}
          />
          <Space />
          <Button
            onPress={() =>
              router.push({
                pathname: "/(app)/cart/addresses",
                //params: { address: address?.id || '' },
              })
            }
          >
            <Txt button title="Change Address" textStyle={{ color: "#ddd" }} />
          </Button>
        </View>
      ) : (
        <View>
          <Txt
            h4
            title="No Address Selected"
            textStyle={{ marginVertical: 8 }}
          />
          <Button
            onPress={() =>
              router.push({
                pathname: "/(app)/cart/addresses",
                params: null as any,
              })
            }
          >
            <Txt button title="Add Address" textStyle={{ color: "black" }} />
          </Button>
        </View>
      )}
    </View>
  );
});

export { CardAddCheckout}