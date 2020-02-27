import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import CustomerList from "./CustomerList";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";

describe("CustomerList", () => {
  const mockStore = configureMockStore();
  const mockState = {
    customers: {
      customers: {
        "1": { name: "c-1", id: "1" },
        "2": { name: "c-2", id: "2" },
        "3": { name: "c-3", id: "3" }
      }
    }
  };

  it("renders a link for every customer", () => {
    const store = mockStore(mockState);
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CustomerList />
        </MemoryRouter>
      </Provider>
    );

    expect(container.querySelectorAll("a")).toHaveLength(3);
  });

  it("renders the loading state", () => {
    const store = mockStore({ customers: { loading: true } });

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CustomerList />
        </MemoryRouter>
      </Provider>
    );

    expect(getByText("loading...")).toBeInTheDocument();
  });
});
