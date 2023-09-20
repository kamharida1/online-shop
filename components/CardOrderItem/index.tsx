import { memo, useEffect, useState } from "react";
import { OrderProduct, Product } from "../../src/models";
import { DataStore } from "aws-amplify";
import { AnimatePresence, View } from "moti";
import CardAnimated from "../CardAnimated";
import tw from "../../lib/tailwind";
import { Image } from "react-native";
import { Txt } from "../Txt";
import { tint } from "../../constants";

interface CardOrderItemProps {
  orderItem: OrderProduct;
}

const CardOrderItem = memo<CardOrderItemProps>(({ orderItem }) => {
  const [product, setProduct] = useState<Product | null>(null);
  //console.warn(cartItem);
  const { productID, ...orderProduct } = orderItem;

  //console.warn(productID);

  useEffect(() => {
    findProduct();
  }, []);

  const findProduct = async () => {
    await DataStore.query(Product, productID).then(setProduct as any);
  };
  return (
    <AnimatePresence exitBeforeEnter>
      <CardAnimated style={tw`flex-row overflow-hidden`}>
        <View style={tw`flex-1 flex-row items-center`}>
          <Image
            source={{ uri: product?.images[0].originalUri }}
            style={tw.style(
              { width: 100, height: 100, borderRadius: 50, marginRight: 20 })}
          />
          <View style={tw`flex-1 justify-center`}>
            <Txt h3 title={product?.title as string} />
            <Txt h3 title={`${orderProduct?.quantity}`} textStyle={{color: 'blue'}} />
            <Txt h5 title={product?.category as string} textStyle={{ color: '#777' }} />
            <Txt h5 title={`${product?.price}`} textStyle={{ color: tint }} />
          </View>
        </View>
      </CardAnimated>
    </AnimatePresence>
  );
});

export { CardOrderItem };
