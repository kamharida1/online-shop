import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CartProduct, Product } from "../../../src/models";
import { Stack, useRouter } from "expo-router";
import { Auth, DataStore } from "aws-amplify";
import { Screen } from "../../../components/Screen";
import CartProductItem from "../../../components/CartProductItem.tsx";
import tw from "../../../lib/tailwind";
import formatPrice from "../../../utils/naira_price";
import { Pressable } from "react-native";

export default function Cart() {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const router = useRouter();

  const fetchCartProducts = async () => {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      DataStore.query(CartProduct, (cp) =>
        cp.userSub.eq(userData.attributes.sub)
      ).then(setCartProducts);
    } catch (error) {
      console.warn("Error fetching cart products:", error);
    }
  };

  useEffect(() => {
    fetchCartProducts();
  }, []);

  useEffect(() => {
    const subscription = DataStore.observe(CartProduct).subscribe((msg) =>
      fetchCartProducts()
    );
    return subscription.unsubscribe;
  }, []);

  useEffect(() => {
    const subscriptions = cartProducts.map((cp) =>
      DataStore.observe(CartProduct, cp.id).subscribe((msg) => {
        if (msg.opType === "UPDATE") {
          setCartProducts((curCartProducts) =>
            curCartProducts.map((cp) => {
              if (cp.id !== msg.element.id) {
                console.log("different id");
                return cp;
              }
              return {
                ...cp,
                ...msg.element,
              };
            })
          );
        }
      })
    );

    return () => {
      subscriptions.forEach((sub) => sub.unsubscribe());
    };
  }, []);

  useEffect(() => {
    const calculateTotalPrice = async () => {
      let totalPrice = 0;

      for (const cp of cartProducts) {
        try {
          const product = await DataStore.query(Product, cp.productID);
          if (product) {
            totalPrice += product.price * cp.quantity;
          }
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      }

      setTotalPrice(totalPrice);
    };

    calculateTotalPrice();
  }, [cartProducts]);

  const onCheckout = () => {
    router.push({ pathname: "/(app)/cart/addresses", params: { totalPrice } });
  };

  if (cartProducts.filter((cp) => !cp.product).length !== 0) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <Stack.Screen options={{ title: "Cart" }} />
      <FlatList
        data={cartProducts}
        keyExtractor={(item) => item.id}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={tw`pb-8`}
        renderItem={({ item }) => <CartProductItem cartItem={item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View style={tw`p-3 rounded-t-xl overflow-hidden`}>
            <Text style={{ fontSize: 18 }}>
              Subtotal ({cartProducts.length} items):{" "}
              <Text style={{ color: "#e47911", fontWeight: "bold" }}>
                {/* {`${"\u20A6"}`} */}
                {/* {formatCurrency(totalPrice)} */}
                {/* <NumberFormatted value={totalPrice} /> */}
                {formatPrice(totalPrice) || 0}
              </Text>
            </Text>
            {/* <Button title="Proceed to checkout" onPress={onCheckout} /> */}
            <Pressable
              style={tw`my-4 items-center justify-center h-13 border-2 rounded-md `}
              onPress={onCheckout}
            >
              <Text style={tw`text-lg font-bold`}>Proceed to checkout</Text>
            </Pressable>
          </View>
        )}
      />
    </>
  );
}
