import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice.ts";
import productReducer from "../features/productSlice.ts";
import cartReducer from "../features/cartSlice.ts";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
