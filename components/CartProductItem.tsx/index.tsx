import { DataStore } from "aws-amplify";
import { CartProduct, Product } from "../../src/models";
import { Image, Pressable, Text, View } from "react-native";
import tw from "twrnc";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import React, { useEffect, useState } from "react";

import { AnimatePresence, MotiView } from "moti";
import CardAnimated from "../CardAnimated.tsx";
import { lightGray } from "../../constants";
import formatPrice from "../../utils/naira_price";
import QuantitySelector from "../QuantitySelector";

interface CartProductItemProps {
  cartItem: CartProduct;
}


const CartProductItem = ({ cartItem }: CartProductItemProps) => {
  const [product, setProduct] = useState<Product | null>(null);
  //console.warn(cartItem);
  const { productID, ...cartProduct } = cartItem;

  //console.warn(productID);

  useEffect(() => {
    findProduct();
  }, []);

  const findProduct = async () => {
    await DataStore.query(Product, productID).then(setProduct as any);
  };

  const deleteCart = async (id: string) => {
    const toDelete = await DataStore.query(CartProduct, id);
    if (toDelete) {
      DataStore.delete(toDelete);
    }
  };

  const updateQuantity = async (newQuantity: number) => {
    const original: any = await DataStore.query(CartProduct, cartProduct.id);

    await DataStore.save(
      CartProduct.copyOf(original, (updated) => {
        updated.quantity = newQuantity;
      })
    );
  };
  return (
    <AnimatePresence exitBeforeEnter>
      <CardAnimated style={tw`flex-row overflow-hidden`}>
        <View style={tw``}>
          <Image
            source={{ uri: product?.images[0] }}
            style={tw.style(
              { flex: 2, width: 100, height: 100, borderRadius: 10 },
              ["items-center"]
            )}
          />
          <QuantitySelector
            quantity={cartProduct.quantity}
            setQuantity={updateQuantity}
          />
        </View>
        <View style={tw`flex-3 pl-4`}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={tw`text-xl font-bold`}
          >
            {product?.title}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={tw`text-base font-medium text-zinc-700 `}
          >
            {product?.description}
          </Text>
          {/* add a nullish coalescing operator (??) to provide a default value in
          case product.count is null or undefined */}
          {product?.count ?? 0 <= 4 ? (
            <Text style={tw`text-red-700 text-sm font-extrabold`}>
              Less than {product?.count} items
            </Text>
          ) : (
            <Text style={tw`text-green-700 text-sm font-bold`}>In Stock</Text>
          )}
          <Text
            style={tw.style(
              "absolute text-[#c45500] right-4 bottom-0 mt-2 font-light text-3xl"
            )}
          >
            {formatPrice(product?.price as any)}
            {/* {`${"\u20A6"}`}
            {product?.price} */}
            {/* <NumberFormatted value={product?.price} /> */}
          </Text>
        </View>

        <View style={tw`flex-0.6`}>
          <Pressable
            style={tw.style({ position: "absolute", top: 3, right: 3 })}
            onPress={() => deleteCart(cartProduct.id)}
          >
            <MaterialCommunityIcons
              name="delete-outline"
              size={30}
              color={lightGray}
            />
          </Pressable>
        </View>
      </CardAnimated>
    </AnimatePresence>
  );
};

export default CartProductItem;
