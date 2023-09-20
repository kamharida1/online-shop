import { Product } from "../src/models";
import {  createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  cart: { product: Product; quantity: number }[];
}

const initialState: CartState = {
  cart:  [],
};


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
    },
    removeFromCart: (state, action: PayloadAction<Product>) => {
      const updatedCart = state.cart.filter(
        (item) => item.product.id !== action.payload.id
      );
      state.cart = updatedCart;
    },
    cleanCart: (state) => {
      state.cart = [];
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
    },
    incrementQuantity: (state, action: PayloadAction<Product>) => {
      const itemIndex = state.cart.findIndex(
        (item) => item.product.id === action.payload.id
      );
      if (state.cart[itemIndex].quantity >= 1) {
        state.cart[itemIndex].quantity++;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  cleanCart,
  decrementQuantity,
  incrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
