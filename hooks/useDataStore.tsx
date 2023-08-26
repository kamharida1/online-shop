import { useEffect, useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { useRouter } from "expo-router";

export function useDataStore(model: any, initialData = []) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  async function create(item) {
    const newItem = await DataStore.save(new model(item));
    setData([...data, newItem]);
  }

  async function read() {
    const items = await DataStore.query(model);
    setData(items);
  }

  async function update(item) {
    const updatedItem = await DataStore.save(item);
    setData(data.map((i) => (i.id === updatedItem.id ? updatedItem : i)));
  }

  async function remove(id) {
    const toDelete = await DataStore.query(model, id);
    await DataStore.delete(toDelete);
    setData(data.filter((i) => i.id !== id));
  }

  function navigateToUpdate(item, screen, mode) {
    // Here, we navigate to the update screen and pass the selected item as a parameter
    // navigation.navigate("Update", { item });
    router.push({
      pathname: `${screen}`,
      params: {
        id: item.id,
        mode: mode === undefined ? "create" : "update",
      },
    });
  }

  async function saveItems() {
    try {
      const savedItems = await DataStore.save(
        data.map((item) => new model(item))
      );
      console.log("Items saved to DataStore:", savedItems);
    } catch (error) {
      console.error("Failed to save items to DataStore:", error);
    }
  }

  useEffect(() => {
    try {
      setLoading(true);
      read();
      setLoading(false);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
    // setLoading(true)
    // read();
    // setLoading(false)
    //saveItems();
    const subscription = DataStore.observe(model).subscribe(() => read());
    return () => subscription.unsubscribe();
  }, []);

  return {
    data,
    loading,
    error,
    create,
    read,
    update,
    remove,
    navigateToUpdate,
  };
}

// import React from "react";
// import { View, Text, FlatList, TouchableOpacity } from "react-native";
// import { useDataStore } from "./useDataStore";
// import { Todo } from "./models";

// export default function ListScreen({ navigation }) {
//   const { data, navigateToUpdate } = useDataStore(Todo, []);

//   return (
//     <View>
//       <FlatList
//         data={data}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity onPress={() => navigateToUpdate(item)}>
//             <Text>{item.name}</Text>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// }

// export function UpdateScreen({ route }) {
//   const { item } = route.params;
//   const { update } = useDataStore(Todo);

//   function handleUpdate(name) {
//     update({ ...item, name });
//     navigation.goBack();
//   }

//   return (
//     <View>
//       <Text>Update Todo</Text>
//       <TextInput value={item.name} onChangeText={handleUpdate} />
//     </View>
//   );
// }
