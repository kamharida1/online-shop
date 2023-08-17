import { Href, Link } from "expo-router"
import { memo } from "react"
import { BlurView } from 'expo-blur';

import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native"
import formatPrice from "../../utils/naira_price";
import { Txt } from "../Txt";

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

interface ProductT {
  obj?: {
    id: string
    title: string
    images: string
    price: number
    oldPrice: number
  }
}

const Product = memo<ProductT>(({ obj }) => {
  if (!obj) {
    return null; // or some fallback JSX if needed
  }
  const { id, images, title, price, oldPrice } = obj
  const { container, imageStyle, textStyle } = styles;
  
  return (
    <Link
      key={id}
      href={{
        pathname: "/",
        params: {
          id,
        },
      }}
      asChild
    >
      <Pressable style={container}>
        {({ hovered, pressed }) => (
          <ImageBackground source={{ uri: images[0] }} style={imageStyle}>
            <BlurView style={{ padding: 8 }} intensity={50} tint="dark">
              {/* <Text style={textStyle}>{title}</Text> */}
              <Txt h5 title={title} />
              {/* <Text style={[textStyle, { fontSize: 17 }]}>
                {formatPrice(price)}
              </Text> */}
              <Txt h3 title={formatPrice(price)} />
            </BlurView>
          </ImageBackground>
        )}
      </Pressable>
    </Link>
  );
})

export {Product}