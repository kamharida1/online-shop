import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { FlatList } from 'react-native-gesture-handler';
import { CardWishlist } from '../../../components/CardWishlist';
import { SafeAreaView } from 'moti';
import { useLocalSearchParams } from 'expo-router';

export default function Wishlist() {
  //  const { wishlisted } = useLocalSearchParams();
  //  const wish = JSON.parse(wishlisted as string);

  const products = useAppSelector((state) => state.wishlist.wishlist);
  
  return (
    <SafeAreaView style={{flex: 1}}>
      {products ? (  
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CardWishlist product={item} />}
        // contentContainerStyle={{flex: 1, marginTop: 100}}
      />
      ) : (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
          <Text style={{fontSize: 24, fontWeight: "bold", color: "#333"}}>No items in wishlist</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({})