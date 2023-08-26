import { Href, Link } from "expo-router"
import { memo } from "react"
import { BlurView } from 'expo-blur';

import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from "react-native"
import formatPrice from "../../utils/naira_price";
import { Txt } from "../Txt";
import tw from "../../lib/tailwind";

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
  obj?: {
    id: string
    title: string
    images: string
    price: number
    oldPrice: number
  }
}

const CardProduct = memo<CardProductT>(({ obj }) => {
  if (!obj) {
    return null; // or some fallback JSX if needed
  }
  const { id, images, title, price, oldPrice } = obj
  const { container, imageStyle, textStyle } = styles;
  
  return (
    <Link
      key={id}
      href={{
        pathname: "/(app)/home/[id]",
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
              <Txt textStyle={{ color: "#fff", fontWeight:"800" }} h5 title={title} />
              {/* <Text style={[textStyle, { fontSize: 17 }]}>
                {formatPrice(price)}
              </Text> */}
              <Txt
                textStyle={{ color: "#fff" }}
                h5
                title={formatPrice(price)}
              />
            </BlurView>
          </ImageBackground>
        )}
      </Pressable>
    </Link>
    // <View style={tw`p-3 flex-col`}>
    //   <Text>{title}</Text>
    //   <Text >{price}</Text>
    //   <Image style={{width: 70, height: 70, backgroundColor: '#111'}} source={{uri: images[0]}} />
    // </View>
  );
})

export { CardProduct };