import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import OrderDetails from "./OrderDetails";
import thunk from "redux-thunk";
import routeData from "react-router";

describe("orderDetails", () => {
  jest.spyOn(routeData, "useParams").mockReturnValue({ customerId: "1" });
  jest.spyOn(routeData, "useHistory").mockReturnValue(jest.fn() as any);

  const mockStore = configureMockStore([thunk]);
  const mockState = {
    orders: {
      orders: {
        "1": {
          loading: false,
          data: {
            id: "1",
            "customer-id": "1",
            items: [
              { id: "a", "product-id": "1" },
              { id: "b", "product-id": "2" },
              { id: "c", "product-id": "3" }
            ],
            total: "42"
          }
        }
      }
    },
    customers: {
      customers: {
        "1": { name: "user" }
      }
    },
    products: {
      products: {}
    }
  };

  it("renders an itemRow for every item", () => {
    const store = mockStore(mockState);
    const { container } = render(
      <Provider store={store}>
        <OrderDetails />
      </Provider>
    );

    expect(container.querySelectorAll("tbody tr")).toHaveLength(3);
  });

  it("renders the order total", () => {
    const store = mockStore(mockState);
    const { getAllByText } = render(
      <Provider store={store}>
        <OrderDetails />
      </Provider>
    );

    expect(getAllByText("Total: $ 42")).toHaveLength(1);
  });
});
