import { customerReducer, initialState } from "./reducer";
import { customersLoading, customersLoaded } from "./actions";

describe("customer reducer", () => {
  const customer: Customer = {
    id: "1",
    name: "user",
    since: "1/1/2020",
    revenue: "-1"
  };

  it("Starts loading when cutomersLoading is dispatched", () => {
    expect(customerReducer(initialState, customersLoading()).loading).toEqual(
      true
    );
  });

  it("Adds the customers when customersLoaded succeeds", () => {
    const { loading, customers } = customerReducer(
      { ...initialState, loading: true },
      customersLoaded({ customers: [customer] })
    );

    expect(loading).toEqual(false);
    expect(customers).toEqual({ "1": customer });
  });

  it("Adds the error when customersLoaded fails", () => {
    const { loading, error } = customerReducer(
      { ...initialState, loading: true },
      customersLoaded({ error: "Error!" })
    );

    expect(loading).toEqual(false);
    expect(error).toEqual("Error!");
  });
});
