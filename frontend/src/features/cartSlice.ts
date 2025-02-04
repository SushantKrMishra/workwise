import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import API from "../api/api.ts";

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CartState = {
  cartItems: [],
  status: "idle",
  error: null,
};

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    const response = await API.get(`/cart/items`);
    return response.data;
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (cartItem: Omit<CartItem, "id">, { dispatch }) => {
    await API.post("/cart/add", cartItem);
    dispatch(fetchCartItems());
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (cartItemId: string, { dispatch }) => {
    await API.delete(`/cart/remove/${cartItemId}`);
    dispatch(fetchCartItems());
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCartItems.fulfilled,
        (state, action: PayloadAction<CartItem[]>) => {
          state.status = "succeeded";
          state.cartItems = action.payload;
        }
      )
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to load cart items";
      });
  },
});

export default cartSlice.reducer;
