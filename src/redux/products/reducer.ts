import { createReducer } from "@reduxjs/toolkit";
import { productsLoading, productsLoaded } from "./actions";

interface ProductState {
  loading: boolean;
  products: Record<string, Product>;
  error?: string;
}

export const initialState: ProductState = {
  loading: false,
  products: {},
  error: undefined
};

export const productReducer = createReducer(initialState, builder => {
  builder.addCase(productsLoading, state => ({ ...state, loading: true }));

  builder.addCase(productsLoaded, (state, action) => {
    const { error, products } = action.payload;

    const productMap: Record<string, Product> = {};
    products?.forEach(product => (productMap[product.id] = product));

    return {
      ...state,
      loading: false,
      error,
      products: productMap
    };
  });
});
