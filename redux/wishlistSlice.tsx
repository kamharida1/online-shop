import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../src/models";

export interface WishlistState {
  wishlist: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: WishlistState = {
  wishlist: [],
  status: "idle",
};

export const wishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishList(state, action) {
      state.wishlist.push(action.payload);
    },
    removeFromWishList(state, action) {
      const newWishlist = state.wishlist.filter(
        (item) => item.id !== action.payload.id);
      state.wishlist = newWishlist;
    },
    removeAll(state) {
      state.wishlist = [];
    },
  },
});

export const { addToWishList, removeFromWishList, removeAll } =
  wishListSlice.actions;
export default wishListSlice.reducer;