import { View, Text, Image } from 'react-native'
import React, { memo } from 'react'
import { AnimatePresence } from 'moti'
import CardAnimated from '../CardAnimated'
import { Product } from '../../src/models';
import { ButtonOutline } from '../ButtonOutline';
import { removeFromWishList } from '../../redux/wishlistSlice';
import formatPrice from '../../utils/naira_price';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';

const CardWishlist = memo(({ product }: { product: Product }) => {
 
  const dispatch = useAppDispatch();

  const handleRemove = () => {
    dispatch(removeFromWishList(product))
   }

  return (
    <AnimatePresence exitBeforeEnter>
      <CardAnimated>
        <View
          style={{
            marginHorizontal: 10,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              width: 100,
              height: 200,
              margin: 8,
            }}
          >
            <Image
              source={{ uri: product.images[0].originalUri }}
              // source={{ uri: product.image.originalUri }}
              style={{ flex: 1 }}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              gap: 5,
              marginVertical: 10,
              marginLeft: 40,
              justifyContent: "center",
              flexWrap: "wrap",
              width: 150,
            }}
          >
            <Text
              numberOfLines={2}
              style={{
                fontWeight: "600",
                fontSize: 16,
                width: 150,
              }}
            >
              {product.title}
            </Text>
            <Text style={{ fontSize: 14, fontWeight: "400" }}>
              {product.brand}
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
              {formatPrice(product.price)}
            </Text>
            <ButtonOutline
              title="Remove from wishlist"
              onPress={handleRemove}
              style={{
                margin: "auto",
                marginTop: 30,
                width: 180,
                borderColor: "red",
              }}
              textStyle={{
                color: "red",
                fontWeight: "600",
                fontSize: 15,
              }}
            />
          </View>
        </View>
      </CardAnimated>
    </AnimatePresence>
  );
});

export { CardWishlist }