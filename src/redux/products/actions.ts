import { createAction } from "@reduxjs/toolkit";
import { fetchProducts } from "../../Api";
import { StoreDispatch } from "..";

export const productsLoading = createAction("products/loading");

export interface ProductsLoaded {
  products?: Product[];
  error?: Error;
}
export const productsLoaded = createAction<ProductsLoaded>("products/loaded");

export const loadProducts = () => async (dispatch: StoreDispatch) => {
  dispatch(productsLoading());

  try {
    const products = await fetchProducts();
    dispatch(
      productsLoaded({
        products
      })
    );
  } catch (error) {
    dispatch(productsLoaded({ error }));
  }
};
