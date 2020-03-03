import { orderReducer, initialState } from "./reducer";
import { orderLoaded, orderLoading, orderUpdate } from "./actions";

describe("Order reducer", () => {
  const customerId = "1";
  const order: Order = {
    id: "2",
    "customer-id": customerId,
    items: [],
    total: "0"
  };

  it("Starts loading when orderLoading is dispatched", () => {
    expect(
      orderReducer(initialState, orderLoading(customerId)).orders[customerId]
        .loading
    ).toEqual(true);
  });

  it("Adds the order when orderLoaded succeeds", () => {
    const { orders } = orderReducer(
      { ...initialState, orders: { "1": { loading: true } } },
      orderLoaded({ customerId, order })
    );

    const { loading, data } = orders[customerId];
    expect(loading).toEqual(false);
    expect(data).toEqual(order);
  });

  it("Adds the error when ordersLoaded fails", () => {
    const { orders } = orderReducer(
      { ...initialState, orders: { "1": { loading: true } } },
      orderLoaded({ customerId, error: "Error!" })
    );

    const { loading, error } = orders[customerId];
    expect(loading).toEqual(false);
    expect(error).toEqual("Error!");
  });

  it("Updates the order when orderUpdate is dispatched", () => {
    const updatedOrder = { ...order, total: "42" };
    const { orders } = orderReducer(
      { ...initialState, orders: { "1": { loading: true } } },
      orderUpdate(updatedOrder)
    );

    const { data } = orders[customerId];
    expect(data).toEqual(updatedOrder);
  });
});
