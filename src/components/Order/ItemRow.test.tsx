import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import ItemRow from "./ItemRow";
import configureMockStore from "redux-mock-store";
import waitForExpect from "wait-for-expect";

jest.mock("../../Api");

describe("ItemRow", () => {
  const mockStore = configureMockStore();
  const mockState = {
    products: {
      products: { "1": { id: "1", description: "mock-product" } }
    }
  };

  const customerId = "1";
  const item: Item = {
    "product-id": "1",
    quantity: "1",
    "unit-price": "10",
    total: "10"
  };

  const setup = () => {
    const store = mockStore(mockState);

    const { getByText, getAllByText } = render(
      <Provider store={store}>
        <table>
          <tbody>
            <ItemRow customerId={customerId} item={item} />
          </tbody>
        </table>
        >
      </Provider>
    );

    return { store, getByText, getAllByText };
  };

  it("renders the product description", () => {
    const { getAllByText } = setup();
    expect(getAllByText("mock-product")).toHaveLength(1);
  });

  it("orders the product when the button is clicked", async () => {
    const { store, getByText } = setup();
    const button = getByText("Delete 1");
    fireEvent.click(button);

    await waitForExpect(() => {
      expect(store.getActions().map(action => action.type)).toEqual([
        "order/update"
      ]);
    });
  });
});
