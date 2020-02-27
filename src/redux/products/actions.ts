import { createAction } from "@reduxjs/toolkit";
import { fetchProducts } from "../../Api";
import { StoreDispatch } from "..";

export const productsLoading = createAction("products/loading");

export interface ProductsLoaded {
  products?: Product[];
  error?: string;
}
export const productsLoaded = createAction<ProductsLoaded>("products/loaded");

/**
 * Fetch all products asynchronously.
 */
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
    dispatch(productsLoaded({ error: error.message }));
  }
};
