import { Product } from "../src/models";
import { AsyncStorage } from "@aws-amplify/core";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

let cartData;
try {
  const storedData =  AsyncStorage.getItem("cart");
  cartData = storedData ? JSON.parse(storedData) : [];
} catch (error) {
  console.error("Error parsing cart data:", error);
  cartData = null;
}

export interface CartState {
  cart: { product: Product; quantity: number }[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: CartState = {
  cart: cartData ?? [],
  status: "idle",
};

// Thunk action to get cart data from AsyncStorage
export const getCartData = createAsyncThunk<CartState | null, void>(
  "cart/getCartData",
  async (_, { getState }) => {
    try {
      const cartData = await AsyncStorage.getItem("cart");
      if (cartData) {
        return JSON.parse(cartData);
      }
      return null;
    } catch (error) {
      console.error("Error getting cart data:", error);
      return null;
    }
  }
);

// Thunk action to save cart data to AsyncStorage
export const saveCartData = createAsyncThunk<void, void>(
  "cart/saveCartData",
  async (_, { getState }) => {
    const cart = (getState() as RootState).cart.cart;
    try {
      await AsyncStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart data:", error);
    }
  }
);

// Thunk action to remove cart data from AsyncStorage
export const clearCartData = createAsyncThunk<void, void>(
  "cart/clearCartData",
  async () => {
    try {
      await AsyncStorage.removeItem("cart");
    } catch (error) {
      console.error("Error clearing cart data:", error);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const itemIndex = state.cart.findIndex(
        (item) => item.product.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cart[itemIndex].quantity++;
      } else {
        state.cart.push({ product: action.payload, quantity: 1 });
      }

      AsyncStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeFromCart: (state, action: PayloadAction<Product>) => {
      const updatedCart = state.cart.filter(
        (item) => item.product.id !== action.payload.id
      );
      state.cart = updatedCart;
      AsyncStorage.setItem("cart", JSON.stringify(state.cart));
    },
    cleanCart: (state) => {
      state.cart = [];
      AsyncStorage.setItem("cart", JSON.stringify(state.cart));
    },
    decrementQuantity: (state, action: PayloadAction<Product>) => {
      const itemIndex = state.cart.findIndex(
        (item) => item.product.id === action.payload.id
      );
      if (state.cart[itemIndex].quantity > 1) {
        state.cart[itemIndex].quantity--;
      } else if (state.cart[itemIndex].quantity === 1) {
        state.cart[itemIndex].quantity = 0;
        state.cart = state.cart.filter(
          (item) => item.product.id !== action.payload.id
        );
      }
      AsyncStorage.setItem("cart", JSON.stringify(state.cart));
    },
    incrementQuantity: (state, action: PayloadAction<Product>) => {
      const itemIndex = state.cart.findIndex(
        (item) => item.product.id === action.payload.id
      );
      if (state.cart[itemIndex].quantity >= 1) {
        state.cart[itemIndex].quantity++;
      }
      AsyncStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartData.fulfilled, (state, action) => {
        if (action.payload !== null) {
          state.cart = action.payload.cart;
        }
      })
      .addCase(saveCartData.fulfilled, (state) => {})
      .addCase(clearCartData.fulfilled, (state) => {
        state.cart = [];
      });
  },
});

export const { addToCart, removeFromCart, cleanCart, decrementQuantity, incrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;