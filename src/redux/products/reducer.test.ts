import { productReducer, initialState } from "./reducer";
import { productsLoading, productsLoaded } from "./actions";

describe("Product reducer", () => {
  const product: Product = {
    id: "1",
    description: "mock product",
    category: "mocks",
    price: "1"
  };

  const mockError = new Error("Error!");

  it("Starts loading when productsLoading is dispatched", () => {
    expect(productReducer(initialState, productsLoading()).loading).toEqual(
      true
    );
  });
  
  it("Adds the products when productsLoaded succeeds", () => {
    const { loading, products } = productReducer(
      { ...initialState, loading: true },
      productsLoaded({ products: [product] })
    );

    expect(loading).toEqual(false);
    expect(products).toEqual([product]);
  });

  it("Adds the error when productsLoaded succeeds", () => {
    const { loading, error } = productReducer(
      { ...initialState, loading: true },
      productsLoaded({ error: mockError })
    );

    expect(loading).toEqual(false);
    expect(error).toEqual(mockError);
  });
});
