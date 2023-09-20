import { useState, useEffect } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Product } from "../src/models";

// export interface ProductData {
//   id?: string;
//   title: string;
//   description?: string;
//   image: string;
//   images: any;
//   options?: string[];
//   category?: string;
//   avgRating?: number;
//   ratings?: number;
//   brand?: string;
//   price: number;
//   oldPrice?: number;
// }

interface ErrorType {
  message: string;
  code?: string;
}

export const useProductStore = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [singleData, setSingleData] = useState<Product | null>(null); // Separate state for single item
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    fetchData();

    const subscription = DataStore.observe(Product).subscribe(() => {
      fetchData();
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const fetchedProducts = await DataStore.query(Product);
      setProducts(fetchedProducts.map((product) => product ));
      setError(null);
    } catch (error) {
      console.log("Error fetching data:", error);
      setError({ message: "Error fetching data", code: "FETCH_ERROR" });
    } finally {
      setIsLoading(false);
    }
  };

  const createProduct = async (productData: any) => {
    try {
      setIsLoading(true);
      // Use the `formData` state to create a new item
      // await DataStore.save(new Product(formData));
      const product = new Product(productData);
      await DataStore.save(product)
      setError(null);
    } catch (error) {
      console.log("Error creating item:", error);
      setError({ message: "Error creating item", code: "CREATE_ERROR" });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSingleProduct = async (id: string) => {
    try {
      setIsLoading(true);
      const singleItem: Product | undefined = await DataStore.query(
        Product,
        id
      );
      if (singleItem) {
        setSingleData(singleItem);
        setError(null);
      } else {
        setSingleData(null);
        setError({ message: "Item not found", code: "ITEM_NOT_FOUND" });
      }
    } catch (error) {
      console.log("Error fetching single data:", error);
      setError({
        message: "Error fetching single data",
        code: "SINGLE_FETCH_ERROR",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateProduct = async (id: string, updatedData: Product) => {
    try {
      setIsLoading(true);
      const product = await DataStore.query(Product, id);
      if (product) {
        const updatedProduct = Product.copyOf(product, (updated) => {
          updated.title = updatedData.title;
          updated.description = updatedData.description;
          updated.avgRating = updatedData.avgRating;
          updated.brand = updatedData.brand;
          updated.category = updatedData.category;
          updated.price = updatedData.price;
          updated.oldPrice = updatedData.oldPrice;
          updated.options = updatedData.options;
          updated.brand = updatedData.brand;
          updated.image = updatedData.image;
        });
        await DataStore.save(updatedProduct);
        setError(null);
      } else {
        setError({ message: "Product not found", code: "PRODUCT_NOT_FOUND" });
      }
    } catch (error) {
      console.log("Error updating product:", error);
      setError({ message: "Error updating product", code: "UPDATE_ERROR" });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      setIsLoading(true);
      const product = await DataStore.query(Product, id);
      if (product) {
        await DataStore.delete(product);
        setError(null);
      } else {
        setError({ message: "Product not found", code: "PRODUCT_NOT_FOUND" });
      }
    } catch (error) {
      console.log("Error deleting product:", error);
      setError({ message: "Error deleting product", code: "DELETE_ERROR" });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    products,
    isLoading,
    setIsLoading,
    error,
    setError,
    singleData,
    fetchData,
    fetchSingleProduct,
    updateProduct,
    deleteProduct,
    createProduct,
  };
};