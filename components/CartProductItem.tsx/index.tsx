import { Auth, DataStore } from "aws-amplify";
import { CartProduct, Product } from "../../src/models";
import { Image, Pressable, Text, View } from "react-native";
import tw from "twrnc";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import React, { useEffect, useState } from "react";

import { AnimatePresence, MotiView } from "moti";
import CardAnimated from "../CardAnimated";
import { card, lightGray, primary, success } from "../../constants";
import formatPrice from "../../utils/naira_price";
import QuantitySelector from "../QuantitySelector";
import { Txt } from "../Txt";

interface CartProductItemProps {
  cartItem: CartProduct;
  onDeleteItem: any;
}

const CartProductItem = ({ cartItem, onDeleteItem }: CartProductItemProps) => {
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

  // const deleteItem = async (id: string) => {
  //   const toDelete = await DataStore.query(CartProduct, id);
  //   if (toDelete) {
  //     DataStore.delete(toDelete);
  //   }
  // };

  const updateQuantity = async (newQuantity: number) => {
     const userData = await Auth.currentAuthenticatedUser();

     if (!product || !userData) {
       return;
     }
    const original: any = await DataStore.query(CartProduct, cartProduct.id);

    await DataStore.save(
      CartProduct.copyOf(original, (updated) => {
        updated.quantity = newQuantity;
        updated.productID = product?.id;
      })
    );
  };

  return (
    <AnimatePresence exitBeforeEnter>
      <View style={{ marginHorizontal: 10 }}>
        <CardAnimated>
          <Pressable
            style={{
              marginVertical: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Image
                source={{ uri: product?.images[0] }}
                style={{ width: 140, height: 140, resizeMode: "contain" }}
              />
            </View>

            <View>
              <Text numberOfLines={3} style={{ width: 150, marginTop: 10 }}>
                {product?.title}
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 6 }}>
                {formatPrice(product?.price as any)}
              </Text>
              <Image
                style={{ width: 30, height: 30, resizeMode: "contain" }}
                source={{
                  uri: "https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png",
                }}
              />
              <Text style={{ color: "green" }}>In Stock</Text>
              <Text style={{ fontWeight: "500", marginTop: 6 }}>
                {product?.ratings} ratings
              </Text>
            </View>
          </Pressable>

          <Pressable
            style={{
              marginTop: 15,
              marginBottom: 10,
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              // backgroundColor: "#F8F6",
            }}
          >
            <QuantitySelector
              cartItem={cartItem}
              quantity={cartProduct.quantity}
              setQuantity={updateQuantity}
            />

            <Pressable
              onPress={() => onDeleteItem(cartProduct.id)}
              style={{
                backgroundColor: "white",
                paddingHorizontal: 8,
                paddingVertical: 10,
                borderRadius: 5,
                borderColor: "#C0C0C0",
                borderWidth: 0.6,
              }}
            >
              <Text>Delete</Text>
            </Pressable>
          </Pressable>
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginTop: 5,
              marginBottom: 35,
            }}
          >
            <Pressable
              style={{
                backgroundColor: "white",
                paddingHorizontal: 8,
                paddingVertical: 10,
                borderRadius: 5,
                borderColor: "#C0C0C0",
                borderWidth: 0.6,
              }}
            >
              <Text>Save For Later</Text>
            </Pressable>

            <Pressable
              style={{
                backgroundColor: "white",
                paddingHorizontal: 8,
                paddingVertical: 10,
                borderRadius: 5,
                borderColor: "#C0C0C0",
                borderWidth: 0.6,
              }}
            >
              <Text>See More Like this</Text>
            </Pressable>
          </Pressable>
        </CardAnimated>
      </View>
    </AnimatePresence>
  );
};

export default CartProductItem;

// <View style={{}}>
//           <Image
//             source={{ uri: product?.images[0] }}
//             style={tw.style(
//               { flex: 2, width: 100, height: 100, borderRadius: 10 },
//               ["items-center"]
//             )}
//           />
//           <QuantitySelector
//             quantity={cartProduct.quantity}
//             setQuantity={updateQuantity}
//           />
//         </View>
//         <View style={tw`flex-3 pl-4`}>
//           <Txt
//             numberOfLines={1}
//             ellipsizeMode="tail"
//             h2
//             title={product?.title as string}
//           />
          
//           <Txt h4 title={product?.description as string} />
//           {/* add a nullish coalescing operator (??) to provide a default value in
//           case product.count is null or undefined */}
//           {product?.count ?? 0 <= 4 ? (
//             // <Text style={tw`text-red-700 text-sm font-extrabold`}>
//             //   Less than {product?.count} items
//             // </Text>
//             <Txt h4 title={`Less than ${product?.count} items`} textStyle={{color: primary}} />
//           ) : (
//             // <Text style={tw`text-green-700 text-sm font-bold`}>In Stock</Text>
//             <Txt h4 title="In Stock" textStyle={{color: success}} />
//           )}
//           <Txt
//             h1
//             title={formatPrice(product?.price as any)}
//             textStyle={{
//               color: '#c45500',
//               marginTop: 8, 
//               position: "absolute",
//               right: 4,
//               bottom: 0,
//             }}
//           />
//         </View>

//         <View style={tw`flex-0.6`}>
//           <Pressable
//             style={tw.style({ position: "absolute", top: 3, right: 3 })}
//             onPress={() => deleteCart(cartProduct.id)}
//           >
//             <MaterialCommunityIcons
//               name="delete-outline"
//               size={30}
//               color={lightGray}
//             />
//           </Pressable>
//         </View>
