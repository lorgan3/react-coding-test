import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import ProductDisplay from "./ProductDisplay";
import "./ProductList.css";

interface Props {
  orderCallback: (productId: Product) => void;
}

export default function ProductList(props: Props) {
  const { loading, products } = useSelector(
    (state: RootState) => state.products
  );
  const { orderCallback } = props;

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <div className="ProductList">
      <h3>Products</h3>
      <div className="ProductList_container">
        {Object.values(products).map(product => (
          <ProductDisplay
            key={product.id}
            product={product}
            onClick={orderCallback}
          />
        ))}
      </div>
      .
    </div>
  );
}
