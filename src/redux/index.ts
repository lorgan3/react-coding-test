import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./products/reducer";

export { loadProducts } from "./products/actions";

export const store = configureStore({
  reducer: { products: productReducer }
});

export type StoreDispatch = typeof store.dispatch;
