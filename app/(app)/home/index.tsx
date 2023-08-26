import { useMemo } from "react";
import { useDataStore } from "../../../hooks/useDataStore";
import { Product } from "../../../src/models";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CardProduct } from "../../../components/CardProduct";
import { DataStore } from "aws-amplify";

const PlaceholderImageSource = "https://picsum.photos/200/300";

export default function Products() {
  const { data: products } = useDataStore(Product);

  if (!products) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <>
      <ProductsList />
    </>
  );
}

function useQueriedProducts() {
  const { data } = useDataStore(Product);
  const { q } = useLocalSearchParams<{ q: string }>();

  return useMemo(
    () =>
      data.filter((item: any) => {
        if (!q) {
          return true;
        }
        return item.title.toLowerCase().includes(q?.toLowerCase());
      }),
    [q, data]
  );
}

function ProductsList() {
  const products = useQueriedProducts();
  const { width } = useWindowDimensions();
  const innerWindow = width - 48;
  const insets = useSafeAreaInsets();

    const handleSyncClick = async () => {
      try {
        await DataStore.start();
        console.log("Manual synchronization successful.");
      } catch (error) {
        console.error("Manual synchronization error:", error);
      }
    };

  return (
    <FlatList
      contentInsetAdjustmentBehavior="automatic"
      scrollEventThrottle={16}
      contentContainerStyle={{backgroundColor: 'white', paddingBottom: 20}}
      data={products}
      renderItem={({ item }) => <CardProduct obj={item} />}
      keyExtractor={(item) => item.title}
      numColumns={2}
      ListEmptyComponent={ListEmptyComponent}
      // ListHeaderComponent={() => (<Button title="Sync" onPress={handleSyncClick} />)}
    />
  );
}

function ListEmptyComponent() {
  const { q } = useLocalSearchParams<{ q?: string }>();
  const router = useRouter();

   const handleSyncClick = async () => {
     try {
       await DataStore.start();
       console.log("Manual synchronization successful.");
     } catch (error) {
       console.error("Manual synchronization error:", error);
     }
   };

  const message = useMemo(() => {
    return q != null ? "No items found: " + q : "Create an item to get started";
  }, [q]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 16, textAlign: "center" }}>{message}</Text>
      <Button title="Sync" onPress={handleSyncClick} />
    </View>
  );
}
