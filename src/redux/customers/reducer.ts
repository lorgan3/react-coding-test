import { createReducer } from "@reduxjs/toolkit";
import { customersLoading, customersLoaded } from "./actions";

interface CustomerState {
  loading: boolean;
  customers: Record<string, Customer>;
  error?: string;
}

export const initialState: CustomerState = {
  loading: false,
  customers: {},
  error: undefined
};

export const customerReducer = createReducer(initialState, builder => {
  builder.addCase(customersLoading, state => ({ ...state, loading: true }));

  builder.addCase(customersLoaded, (state, action) => {
    const { error, customers } = action.payload;

    const customerMap: Record<string, Customer> = {};
    customers?.forEach(customer => (customerMap[customer.id] = customer));

    return {
      ...state,
      loading: false,
      error,
      customers: customerMap
    };
  });
});
