import { FlatList, Text, View } from "react-native";

import { Stack, router } from "expo-router";

import CartProductItem from "../../../components/CartProductItem.tsx";
import tw from "../../../lib/tailwind";
import formatPrice from "../../../utils/naira_price";
import { Pressable } from "react-native";
import { AppContainer } from "../../../components/AppContainer";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux-hooks";

export default function Cart() {
  const cart = useAppSelector((state) => state.cart.cart);

  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(getCartData());
  // }, [dispatch]);

  console.log(cart);

  const total = cart
    ?.map((item) => item.product.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  const quantity = cart
    ?.map((item) => item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  const onCheckout = () => {
    router.push({
      pathname: "/(app)/cart/confirm",
      params: { total },
    });
  };

  return (
    <AppContainer flatList>
      <Stack.Screen options={{ title: "Cart" }} />
      <FlatList
        data={cart}
        keyExtractor={(item) => item.product.id}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={tw`pb-8`}
        renderItem={({ item }) => <CartProductItem cartItem={item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View style={tw`p-3 rounded-t-xl overflow-hidden`}>
            <Text style={{ fontSize: 24, fontFamily: "AirBold" }}>
              Subtotal ({quantity} {quantity <= 1 ? "item" : "items"}):{" "}
              <Text style={{ color: "#e47911", fontWeight: "bold" }}>
                {/* {`${"\u20A6"}`} */}
                {/* {formatCurrency(totalPrice)} */}
                {/* <NumberFormatted value={totalPrice} /> */}
                {formatPrice(total) || 0}
              </Text>
            </Text>
            <Pressable
              style={{
                backgroundColor: "#FFC72C",
                padding: 15,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                //marginHorizontal: 10,
                marginTop: 10,
              }}
              onPress={onCheckout}
            >
              <Text style={{ fontFamily: "AirBold", fontSize: 17 }}>
                Proceed to checkout
              </Text>
            </Pressable>
            {/* <Button
              title="To Forms"
              onPress={() => router.push("/(app)/cart/forms")}
            /> */}
          </View>
        )}
      />
    </AppContainer>
  );
}
