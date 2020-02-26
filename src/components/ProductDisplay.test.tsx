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

    const desciption = getByText(/mock product/i);
    expect(desciption).toBeInTheDocument();
  });
});
