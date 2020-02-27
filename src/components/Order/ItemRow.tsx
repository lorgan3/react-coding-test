import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux";
import { deleteOrderProduct } from "../../api";
import { orderUpdate } from "../../redux";

interface Props {
  item: Item;
  customerId: string;
}

export default function ItemRow({ item, customerId }: Props) {
  const dispatch = useDispatch();
  const product = useSelector((state: RootState) => {
    return state.products.products[item["product-id"]];
  });

  const handleDeleteProduct = useCallback(async () => {
    try {
      const updatedOrder = await deleteOrderProduct(customerId, product);
      dispatch(orderUpdate(updatedOrder));
    } catch (e) {
      // TODO: Show an error message.
      console.error(e);
    }
  }, [dispatch, product, customerId]);

  return (
    <tr>
      <td>{product ? product.description : `Product ${item["product-id"]}`}</td>
      <td>$ {item["unit-price"]}</td>
      <td>{item.quantity}</td>
      <td>$ {item.total}</td>
      <td>
        <button onClick={handleDeleteProduct}>Delete 1</button>
      </td>
    </tr>
  );
}
