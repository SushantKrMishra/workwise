import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import API from "../api/api.ts";

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  discount: number;
}

interface ProductsState {
  products: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await API.get("products/fetchProducts");
    return response.data;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product: Omit<Product, "id">) => {
    const response = await API.post("/products/add", product);
    return response.data.product;
  }
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async (product: Product) => {
    const response = await API.put(`/products/edit/${product.id}`, product);
    return response.data.product;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId: string) => {
    await API.delete(`/products/delete/${productId}`);
    return productId;
  }
);

export const setSearchTerm = createSlice({
  name: "search",
  initialState: "",
  reducers: {
    updateSearchTerm(state, action: PayloadAction<string>) {
      return action.payload;
    },
  },
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = "succeeded";
          state.products = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to load products";
      });

    builder.addCase(
      addProduct.fulfilled,
      (state, action: PayloadAction<Product>) => {
        state.products.push(action.payload);
      }
    );

    builder.addCase(
      editProduct.fulfilled,
      (state, action: PayloadAction<Product>) => {
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index >= 0) {
          state.products[index] = action.payload;
        }
      }
    );

    builder.addCase(
      deleteProduct.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      }
    );
  },
});

export const { updateSearchTerm } = setSearchTerm.actions;
export default productSlice.reducer;
