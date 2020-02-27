import React, { useCallback } from "react";

interface Props {
  product: Product;
  onClick?: (product: Product) => void;
}

export default function ProductDisplay(props: Props) {
  const { product, onClick } = props;
  const { category, description, price } = product;
  const handleClick = useCallback(() => onClick!(product), [onClick, product]);

  return (
    <div className="ProductDisplay">
      <ul>
        <li>
          <strong>Description:</strong> {description}
        </li>
        <li>
          <strong>Category:</strong> {category}
        </li>
        <li>
          <strong>Price:</strong> $ {price}
        </li>
      </ul>
      {onClick && <button onClick={handleClick}>Add to order</button>}
    </div>
  );
}
