import { createReducer } from "@reduxjs/toolkit";
import { productsLoading, productsLoaded } from "./actions";

interface ProductState {
  loading: boolean;
  products: Product[];
  error?: Error;
}

export const initialState: ProductState = {
  loading: false,
  products: [],
  error: undefined
};

export const productReducer = createReducer(initialState, builder => {
  builder.addCase(productsLoading, state => ({ ...state, loading: true }));

  builder.addCase(productsLoaded, (state, action) => ({
    ...state,
    loading: false,
    ...action.payload
  }));
});
