import { Href, Link, router } from "expo-router"
import { memo } from "react"
import { BlurView } from 'expo-blur';

import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from "react-native"
import formatPrice from "../../utils/naira_price";
import { Txt } from "../Txt";
import tw from "../../lib/tailwind";
import { LazyProduct, Product } from "../../src/models";

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

interface CardProductT {
  item: LazyProduct ;
}

const CardProduct = memo<CardProductT>(({ item }) => {
  if (!item) {
    return null; // or some fallback JSX if needed
  }
  const { id, images, title, price, image } = item
  const { container, imageStyle, textStyle } = styles;

  const onPress = () => {
    router.push({ pathname: "/(app)/home/detail", params: { id } });
  }
  
  return (
    
      <Pressable onPress={onPress}  style={container}>
        <ImageBackground
          source={{ uri: images[0].originalUri }}
          // source={{ uri: image?.originalUri }}
          style={imageStyle}
        >
          <BlurView style={{ padding: 8 }} intensity={50} tint="dark">
            <Txt textStyle={{ color: "#fff", fontWeight:"800" }} h5 title={title} />
            <Txt
              textStyle={{ color: "#fff" }}
              h5
              title={formatPrice(price)}
            />
          </BlurView>
        </ImageBackground>
      </Pressable>
  );
})

export { CardProduct };