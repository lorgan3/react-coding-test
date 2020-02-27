import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { productReducer } from "./products/reducer";
import { customerReducer } from "./customers/reducer";
import { orderReducer } from "./orders/reducer";

export { loadProducts } from "./products/actions";
export { loadCustomers } from "./customers/actions";
export { loadOrder, orderUpdate } from "./orders/actions";

export const reducer = combineReducers({
  products: productReducer,
  customers: customerReducer,
  orders: orderReducer
});
export type RootState = ReturnType<typeof reducer>;

export const store = configureStore({
  reducer
});
export type StoreDispatch = typeof store.dispatch;
