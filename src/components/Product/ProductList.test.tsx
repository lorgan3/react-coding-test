import React from "react";
import { render } from "@testing-library/react";
import ProductList from "./ProductList";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

describe("ProductList", () => {
  const mockStore = configureMockStore();
  const mockState = {
    products: {
      products: { "1": { id: "1" }, "2": { id: "2" }, "3": { id: "3" } }
    }
  };

  it("renders a ProductDisplay for every product", () => {
    const store = mockStore(mockState);
    const { container } = render(
      <Provider store={store}>
        <ProductList orderCallback={jest.fn()} />
      </Provider>
    );

    expect(container.querySelectorAll(".ProductDisplay")).toHaveLength(3);
  });
});
