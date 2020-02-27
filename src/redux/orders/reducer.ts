import { createReducer } from "@reduxjs/toolkit";
import { orderLoaded, orderLoading, orderUpdate } from "./actions";

interface OrderState {
  orders: Record<
    string,
    {
      loading: boolean;
      data?: Order;
      error?: string;
    }
  >;
}

export const initialState: OrderState = {
  orders: {}
};

export const orderReducer = createReducer(initialState, builder => {
  builder.addCase(orderLoading, (state, action) => ({
    ...state,
    orders: {
      ...state.orders,
      [action.payload]: { ...state.orders[action.payload], loading: true }
    }
  }));

  builder.addCase(orderLoaded, (state, action) => {
    const { customerId, order, error } = action.payload;
    return {
      ...state,
      orders: {
        ...state.orders,
        [customerId]: {
          ...state.orders[customerId],
          loading: false,
          data: order,
          error
        }
      }
    };
  });

  builder.addCase(orderUpdate, (state, action) => {
    const order = action.payload;

    return {
      ...state,
      orders: {
        ...state.orders,
        [order.id]: { loading: false, data: order, error: undefined }
      }
    };
  });
});
