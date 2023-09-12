import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Button, FlatList, Text, View } from "react-native";
import { CartProduct, LazyCartProduct, Product } from "../../../src/models";
import { Stack, useRouter } from "expo-router";
import { Auth, DataStore } from "aws-amplify";
import { Screen } from "../../../components/Screen";
import CartProductItem from "../../../components/CartProductItem.tsx";
import tw from "../../../lib/tailwind";
import formatPrice from "../../../utils/naira_price";
import { Pressable } from "react-native";
import { AppContainer } from "../../../components/AppContainer";

export default function Cart() {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const fetchCartProducts = async () => {
    setLoading(true);
    try {
      const userData = await Auth.currentAuthenticatedUser();
      DataStore.query(CartProduct, (cp) =>
        cp.userSub.eq(userData.attributes.sub)
      ).then(setCartProducts);
      setLoading(false);
    } catch (error) {
      console.warn("Error fetching bag products:", error);
    }
  };

  useEffect(() => {
    //if (!cartProducts) return;
    fetchCartProducts();
  }, []);

  console.log(cartProducts);

  const onDeleteItem = useCallback(async (id: string) => {
    setCartProducts((curCartProducts) =>
      curCartProducts.filter((cp) => cp.id !== id));
    
    const toDelete = await DataStore.query(CartProduct, id);
    if (toDelete) {
      DataStore.delete(toDelete);
    }
  },[])

  useEffect(() => {
    const subscription = DataStore.observe(CartProduct).subscribe((msg) =>
      fetchCartProducts()
    );
    return subscription.unsubscribe;
  }, [
  ]);

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
        } else if (msg.opType === "DELETE") {
          setCartProducts((curCartProducts) =>
            curCartProducts.filter((cp) => cp.id !== msg.element.id)
          );
        }
      })
    );

    return () => {
      subscriptions.forEach((sub) => sub.unsubscribe());
    };
  }, [cartProducts]);

  useEffect(() => {
    const calculateQuantity = async () => { 
      let quantity = 0;
      for (const cp of cartProducts) {
        quantity += cp.quantity;
      }
      setQuantity(quantity);
    }

    calculateQuantity();
  }, [cartProducts])

  useEffect(() => {
    const calculateTotalPrice = async () => {
      let totalPrice = 0;

      for (const cp of cartProducts) {
          const product = await DataStore.query(Product, cp.productID);
          if (product) {
            totalPrice += product.price * cp.quantity;
          }
      }
      setTotalPrice(totalPrice);
    };

    calculateTotalPrice();
  }, [cartProducts]);

  const onCheckout = () => {
    router.push({
      pathname: "/(app)/cart/addresses",
      params: { totalPrice },
    });
  };

  // if (cartProducts.filter((cp) => !cp.product).length !== 0) {
  //   return <ActivityIndicator />;
  // }

  return (
    <AppContainer loading={loading} flatList>
      <Stack.Screen options={{ title: "Cart" }} />
      <FlatList
        data={cartProducts}
        keyExtractor={(item) => item.id}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={tw`pb-8`}
        renderItem={({ item }) => <CartProductItem onDeleteItem={onDeleteItem} cartItem={item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View style={tw`p-3 rounded-t-xl overflow-hidden`}>
            <Text style={{ fontSize: 24, fontFamily: "AirBold" }}>
              Subtotal ({quantity} {cartProducts.length <= 1 ? 'item' : 'items'}):{" "}
              <Text style={{ color: "#e47911", fontWeight: "bold" }}>
                {/* {`${"\u20A6"}`} */}
                {/* {formatCurrency(totalPrice)} */}
                {/* <NumberFormatted value={totalPrice} /> */}
                {formatPrice(totalPrice) || 0}
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
