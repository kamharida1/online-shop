import { Href, Link, router } from "expo-router";
import { memo, useState } from "react";
import { BlurView } from "expo-blur";

import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import formatPrice from "../../utils/naira_price";
import { Txt } from "../Txt";
import tw from "../../lib/tailwind";
import { LazyProduct, Product } from "../../src/models";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { addToCart } from "../../redux/cartSlice";

const styles = StyleSheet.create({
  container: {
    width: "45%",
    aspectRatio: 1,
    margin: "2.5%",
    borderRadius: 10,
    overflow: "hidden",
  },
  imageStyle: {
    flex: 1,
    justifyContent: "flex-end",
  },
  textStyle: {
    fontFamily: "AirMedium",
    fontSize: 16,
    fontWeight: "400",
    color: "white",
  },
});

interface CardProduct2T {
  item: LazyProduct;
}

const CardProduct2 = memo<CardProduct2T>(({ item }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useAppDispatch();


  const addItemToCart = () => { 
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => { 
      setAddedToCart(false);
    }, 1000);
  };

  if (!item) {
    return null; // or some fallback JSX if needed
  }
  const { id, images, title, price, image } = item;

  const onPress = () => {
    router.push({ pathname: "/(app)/home/detail", params: { id } });
  };

  return (
    <Pressable style={{ marginHorizontal: 20, marginVertical: 25 }}>
      <Image
        source={{ uri: image?.originalUri}}
        style={{ width: 150, height: 200, resizeMode: "contain" }}
      />
   <Text numberOfLines={1} style={{ width: 150, marginTop: 10 }}>
        {title}
      </Text>

      <View
        style={{
          marginTop: 5,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          {formatPrice(item.price)}
        </Text>
        <Text style={{ color: "#FFC72C", fontWeight: "bold" }}>
          {item?.ratings} ratings
        </Text>
      </View>

      <Pressable
        onPress={addItemToCart}
        style={{
          marginTop: 10,
          backgroundColor: "#FFC72C",
          paddingVertical: 10,
          borderRadius: 5,
          width: 150,
          alignItems: "center",
        }}
      >
        {addedToCart ? (
          <View>
            <Text>Added to cart</Text>
          </View>
        ) : (
          <Text>Add to cart</Text>
        )}
      </Pressable>
    </Pressable>
  );
});

export { CardProduct2 }
