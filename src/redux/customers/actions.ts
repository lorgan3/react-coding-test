import { createAction } from "@reduxjs/toolkit";
import { fetchCustomers } from "../../Api";
import { StoreDispatch } from "..";

export const customersLoading = createAction("customers/loading");

export interface CustomersLoaded {
  customers?: Customer[];
  error?: string;
}
export const customersLoaded = createAction<CustomersLoaded>(
  "customers/loaded"
);

/**
 * Fetch all customers asynchronously.
 */
export const loadCustomers = () => async (dispatch: StoreDispatch) => {
  dispatch(customersLoading());

  try {
    const customers = await fetchCustomers();
    dispatch(
      customersLoaded({
        customers
      })
    );
  } catch (error) {
    dispatch(customersLoaded({ error: error.message }));
  }
};
