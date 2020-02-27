import { createAction } from "@reduxjs/toolkit";
import { fetchOrder } from "../../Api";
import { StoreDispatch } from "..";

export const orderLoading = createAction<string>("order/loading");

export interface OrdersLoaded {
  customerId: string;
  order?: Order;
  error?: string;
}
export const orderLoaded = createAction<OrdersLoaded>("order/loaded");

export const orderUpdate = createAction<Order>("order/update");

/**
 * Fetch an order for a customer.
 * @param customerId The customer id.
 */
export const loadOrder = (customerId: string) => async (
  dispatch: StoreDispatch
) => {
  dispatch(orderLoading(customerId));

  try {
    const order = await fetchOrder(customerId);
    dispatch(
      orderLoaded({
        customerId,
        order
      })
    );
  } catch (error) {
    dispatch(orderLoaded({ customerId, error: error.message }));
  }
};
