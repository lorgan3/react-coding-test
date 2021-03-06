import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./App";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

jest.mock("../api");

describe("CustomerList", () => {
  const mockStore = configureMockStore([thunk]);
  const mockState = {
    customers: {
      customers: {
        "1": { name: "user", id: "1" }
      }
    },
    products: {
      products: {}
    },
    orders: { orders: {} }
  };

  it("renders the customer summary by default", () => {
    const store = mockStore(mockState);
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getByText("Customer list")).toBeInTheDocument();
  });
});
