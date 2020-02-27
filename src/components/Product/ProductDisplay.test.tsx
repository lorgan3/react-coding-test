import React from "react";
import { render } from "@testing-library/react";
import ProductDisplay from "./ProductDisplay";

describe("ProductDisplay", () => {
  const product: Product = {
    id: "1",
    description: "mock product",
    category: "mocks",
    price: "1"
  };

  it("renders the product", () => {
    const { getByText } = render(<ProductDisplay product={product} />);

    const desciption = getByText("mock product");
    expect(desciption).toBeInTheDocument();
  });

  it("the update button is in the dom when the callback is provided", () => {
    const { getByText } = render(
      <ProductDisplay product={product} onClick={jest.fn()} />
    );

    const button = getByText("Add to order");
    expect(button).toBeInTheDocument();
  });

  it("the update button is not in the dom when the callback is not provided", () => {
    const { queryByText } = render(<ProductDisplay product={product} />);

    const button = queryByText("Add to order");
    expect(button).toBeNull();
  });
});
