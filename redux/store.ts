import { combineReducers, configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice';
import wishlistReducer from './wishlistSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';


const cartPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['cart'],
};
const wishlistPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['wishlist'],
};


const cartPersistedReducer = persistReducer(cartPersistConfig, cartReducer);
const wishlistPersistedReducer = persistReducer(wishlistPersistConfig, wishlistReducer);

export const store = configureStore({
  reducer: {
    cart: cartPersistedReducer,
    wishlist: wishlistPersistedReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(thunk)
});

export const persistor = persistStore(store);


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch