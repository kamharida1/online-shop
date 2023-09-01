import { useEffect, useState } from "react";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { Address } from "../src/models";

const useAddressWithObservation = () => {
  const [items, setItems] = useState<Address[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch data
  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedItems = await DataStore.query(Address);
      setItems(fetchedItems);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Function to create an item
  const createItem = async (newItem: Address) => {
    try {
      await DataStore.save(newItem);
      await fetchItems(); // Fetch data again after successful creation
    } catch (err: any) {
      setError(err.message || "An error occurred");
    }
  };

  // Function to update an item
  const updateItem = async (updatedItem: Address) => {
    try {
      await DataStore.save(updatedItem);
      await fetchItems(); // Fetch data again after successful update
    } catch (err: any) {
      setError(err.message || "An error occurred");
    }
  };

  // Function to delete an item
  const deleteItem = async (id: string) => {
    try {
      const itemToDelete = await DataStore.query(
        Address,
        (c) => c.id.eq(id)
      );
      if (itemToDelete.length === 1) {
        await DataStore.delete(itemToDelete[0]);
        await fetchItems(); // Fetch data again after successful deletion
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    }
  };

  // Use the observe method for real-time updates
  useEffect(() => {
    const subscription = DataStore.observe(Address).subscribe(() => {
      fetchItems();
    });

    return () => subscription.unsubscribe(); // Clean up the subscription when the component unmounts
  }, []);

  return {
    addresses: items,
    loading,
    error,
    createAddress: createItem,
    updateAddress: updateItem,
    deleteAddress: deleteItem,
  };
};

export default useAddressWithObservation;
