import { useCallback, useEffect, useState } from "react";
import { CartProduct, LazyCartProduct, Product } from "../../../src/models";
import { Stack, router, useLocalSearchParams, useRouter } from "expo-router";
import { Auth, DataStore } from "aws-amplify";
import { AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {  Dimensions, ImageBackground, Pressable, Text, View } from "react-native";
import ImageModal from "../../../components/ImageModal";
import formatPrice from "../../../utils/naira_price";
import ImageCarousel from "../../../components/Carousel";
import { tint } from "../../../constants";
import { CardProductDetail } from "../../../components/CardProductDetail";
import { ScrollView } from "react-native-gesture-handler";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { addToCart } from "../../../redux/cartSlice";
import { addToWishList, removeFromWishList } from "../../../redux/wishlistSlice";
import { ButtonOutline } from "../../../components/ButtonOutline";

export default function ProductDetail() {
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [addedToCart, setAddedToCart] = useState(false);
  let [isImageModalVisible, setIsImageModalVisible] = useState(false);
  let [activeIndex, setActiveIndex] = useState(0);
  const { width } = Dimensions.get("window");
  const height = (width * 100) / 100 + 130;
  const { id } = useLocalSearchParams();
  const dispatch = useAppDispatch();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const products = useAppSelector((state) => state.wishlist.wishlist);

  const toggleWishlist = () => {
    if (isWishlisted) {
      dispatch(removeFromWishList(product));
    } else {
      // if(products.includes(product as any)) return;
      dispatch(addToWishList(product));
    }
    setIsWishlisted(!isWishlisted);
  };

  useEffect(() => {
    if (!id) return;
    DataStore.query(Product, id as string).then(setProduct);
  }, [id]);

  const handleImagePress = useCallback(
    (index: number): void => {
      setIsImageModalVisible(!isImageModalVisible);
      setActiveIndex(index);
    },
    [isImageModalVisible, activeIndex]
  );

  const onAddToCart = async () => {
    setAddedToCart(true);
    dispatch(addToCart(product as any));
    setTimeout(() => {
      setAddedToCart(false);
    }, 6000);
  };

  // const cart = useAppSelector((state) => state.cart);
  // console.log(cart);

  return (
    <ScrollView
      style={{ marginTop: 68, marginBottom: 75, backgroundColor: "white" }}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
    >
      <Stack.Screen options={{ title: product?.title }} />
      {/* <ImageCarousel onImagePress={handleImagePress} product={product as any} /> */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {product?.images.map((item, index) => (
          <ImageBackground
            style={{ width, height, marginTop: 25 }}
            source={{ uri: item.originalUri }}
            key={index}
          >
            <View
              style={{
                padding: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#C60C30",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: 12,
                  }}
                >
                  20% off
                </Text>
              </View>

              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#E0E0E0",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <MaterialCommunityIcons
                  name="share-variant"
                  size={24}
                  color="black"
                />
              </View>
            </View>

            <Pressable
              onPress={toggleWishlist}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#E0E0E0",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginTop: "auto",
                marginLeft: 20,
                marginBottom: 20,
              }}
            >
              {isWishlisted && products.includes(product) ? (
                <AntDesign name="heart" size={24} color="red" />
              ) : (
                <AntDesign name="hearto" size={24} color="black" />
              )}
            </Pressable>
            <View
              style={{
                position: "absolute",
                bottom: 20,
                right: 20,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <ButtonOutline
                style={{ borderColor: "white", borderWidth: 1, borderRadius: 10, padding: 10, marginRight: 10 }}
                textStyle={{ color: "white", fontSize: 17, fontWeight: "600" }}
                title="Go to Wishlist"
                onPress={() =>
                  router.push({
                    pathname: "/(app)/home/wishlist",
                    params: { wishlisted: isWishlisted.toString() },
                  })
                }
              />
            </View>
          </ImageBackground>
        ))}
      </ScrollView>

      <View style={{ padding: 10 }}>
        <Text
          //numberOfLines={1}
          //ellipsizeMode="tail"
          style={{
            fontSize: 17,
            fontWeight: "500",
            //fontFamily: "AirBold",
          }}
        >
          {product?.title}
        </Text>
        <Text
          style={{
            fontSize: 18,
            //fontFamily: "AirBold",
            marginTop: 6,
            color: tint,
          }}
        >
          {formatPrice(product?.price as number)}
        </Text>
      </View>

      <View
        style={{
          height: 1,
          marginVertical: 6,
          borderColor: "#D0D0D0",
          borderWidth: 0.5,
        }}
      />

      <View style={{ padding: 10 }}>
        <Text
          style={{
            //fontFamily: "AirBold",
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          Description
        </Text>
        <Text
          style={{
            //fontFamily: "AirBlack",
            fontSize: 15,
            marginTop: 6,
          }}
        >
          {product?.description}
        </Text>
      </View>
      <View
        style={{
          height: 1,
          marginVertical: 6,
          borderColor: "#D0D0D0",
          borderWidth: 0.5,
        }}
      />
      <CardProductDetail productDetails={product?.productDetails} />
      <View
        style={{
          height: 1,
          marginVertical: 6,
          borderColor: "#D0D0D0",
          borderWidth: 0.5,
        }}
      />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 28, fontWeight: "300", marginVertical: 20 }}>
          {formatPrice(product?.price as number)}
        </Text>
        <Text
          style={{
            color: "#e47911",
            //fontFamily: "AirBold",
          }}
        >
          FREE delivery Tomorrow by 3 PM.Order within 10hrs 30 mins
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            marginVertical: 8,
          }}
        >
          <Ionicons name="location" size={24} color="black" />

          <Text
            style={{
              fontSize: 14,
              color: "#444",
              fontWeight: "500",
              //fontFamily: "AirMedium",
            }}
          >
            Deliver To Nnamdi - AguBrothers 560019
          </Text>
        </View>
      </View>
      {product?.count && product.count < 3 ? (
        <Text
          style={{
            color: "red",
            marginHorizontal: 10,
            fontFamily: "AirBold",
            fontSize: 17,
          }}
        >
          Only {product?.count} left in stock - order soon.
        </Text>
      ) : (
        <Text
          style={{
            color: "green",
            marginHorizontal: 10,
            fontFamily: "AirBold",
            fontSize: 20,
          }}
        >
          {/* {product?.count} left in stock */}
          IN Stock
        </Text>
      )}
      <Pressable
        onPress={onAddToCart}
        style={{
          backgroundColor: "#FFC72C",
          padding: 15,
          borderRadius: 15,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginVertical: 20,
        }}
      >
        {addedToCart ? (
          <View>
            <Text style={{ fontFamily: "AirBold", fontSize: 17 }}>
              Added to Cart
            </Text>
          </View>
        ) : (
          <Text style={{ fontFamily: "AirBold", fontSize: 17 }}>
            Add to Cart
          </Text>
        )}
      </Pressable>
      <Pressable
        onPress={() => alert("Buy Now")}
        style={{
          backgroundColor: "#FFAC1C",
          padding: 15,
          borderRadius: 15,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginBottom: 20,
        }}
      >
        <Text style={{ fontFamily: "AirBold", fontSize: 17 }}>Buy Now</Text>
      </Pressable>
      <ImageModal
        activeIndex={activeIndex}
        images={product?.images.map((item) => item.originalUri) as any}
        isVisible={isImageModalVisible}
        setVisible={setIsImageModalVisible}
      />
    </ScrollView>
  );
}
