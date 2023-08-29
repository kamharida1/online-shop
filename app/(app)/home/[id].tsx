import { useCallback, useEffect, useState } from "react";
import { CartProduct, Product } from "../../../src/models";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Auth, DataStore } from "aws-amplify";
import { Button, Text, View } from "react-native";
import { AppContainer } from "../../../components/AppContainer";
import tw from "../../../lib/tailwind";
import QuantitySelector from "../../../components/QuantitySelector";
import ImageModal from "../../../components/ImageModal";
import formatPrice from "../../../utils/naira_price";
import ImageCarousel from "../../../components/Carousel";
import { Txt } from "../../../components/Txt";

export default function ProductDetail() {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);


  let [isImageModalVisible, setIsImageModalVisible] = useState(false);
  let [activeIndex, setActiveIndex] = useState(0);

  const { id } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    DataStore.query(Product, id as string).then(setProduct);
    setIsLoading(false);
  }, [id]);

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

  const handleImagePress = useCallback((index: number): void=> { 
      setIsImageModalVisible(!isImageModalVisible);
      setActiveIndex(index);
  }, [isImageModalVisible, activeIndex]);

  const onAddToCart = async () => {
    const userData = await Auth.currentAuthenticatedUser();

    if (!product || !userData) {
      return;
    }

    // Check if the product already exists in the cart
    const existingCartProduct = cartProducts.find(
      (cp) => cp.productID === product.id
    );

    if (existingCartProduct) {
      // If the product already exists, update the quantity
      const updatedQuantity = existingCartProduct.quantity + 1;

      // Create a new instace of CartProduct with the updated quantity
      const updatedCartProduct = CartProduct.copyOf(
        existingCartProduct,
        (updated) => {
          // (updated.userSub = userData.attributes.sub),
            (updated.quantity = updatedQuantity),
            (updated.productID = product.id);
        }
      );

      await DataStore.save(updatedCartProduct);
    } else {
      const newCartProduct = new CartProduct({
        userSub: userData.attributes.sub,
        quantity,
        productID: product.id,
      });
      await DataStore.save(newCartProduct);
    }

    router.push("/cart");
  };

  if (isLoading && !product) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: `${product?.title}`,
        }}
      />
      <AppContainer>
        <View style={tw`flex-1 bg-white`}>
          <ImageCarousel onImagePress={handleImagePress} product={product} />

          <View
            style={{
              justifyContent: "space-between",
              padding: 1,
            }}
          >
            <Txt
              h1
              title={product?.title as string}
              numberOfLines={1}
              ellipsizeMode="tail"
              textStyle={tw`text-2xl font-semibold text-black`}
            />
            <Text style={tw`font-medium text-3xl mt-2 text-slate-700`}>
              {formatPrice(product?.price as number)}
            </Text>
          </View>
          <View
            style={{
              height: 1,
              marginVertical: 6,
              borderColor: "#D0D0D0",
              borderWidth: 0.4,
            }}
          />
          <Text
            style={{
              marginTop: 16,
              lineHeight: 24,
            }}
          >
            {product?.description}
          </Text>
          <Button title="Add to Cart" onPress={onAddToCart} />
          <Button
            title="Go to Cart"
            onPress={() => router.push("/(app)/cart")}
          />
          <View style={tw`self-center`}>
            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
          </View>
        </View>
        <ImageModal
          activeIndex={activeIndex}
          images={product?.images}
          isVisible={isImageModalVisible}
          setVisible={setIsImageModalVisible}
        />
      </AppContainer>
    </View>
  );

 }