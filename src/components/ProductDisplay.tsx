import React from "react";

interface Props {
  product: Product;
}

export default function ProductDisplay(props: Props) {
  const {
    product: { category, description, price }
  } = props;

  return (
    <div className="ProductItem">
      <ul>
        <li>
          <strong>Description:</strong> {description}
        </li>
        <li>
          <strong>Category:</strong> {category}
        </li>
        <li>
          <strong>Price:</strong> {price}
        </li>
      </ul>
    </div>
  );
}
