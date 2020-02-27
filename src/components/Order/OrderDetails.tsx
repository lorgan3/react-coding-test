import React, { useEffect, useCallback } from "react";
import { useParams, Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadOrder, orderUpdate } from "../../redux";
import { RootState } from "../../redux";
import ItemRow from "./ItemRow";
import { placeOrder, addOrderProduct } from "../../api";
import ProductList from "../Product/ProductList";
import "./OrderDetails.css";

export default function OrderDetails() {
  const { customerId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!customerId) {
      return;
    }

    dispatch(loadOrder(customerId));
  }, [dispatch, customerId]);

  const { loading, data, error } = useSelector(
    (state: RootState) => state.orders.orders[customerId!] || {}
  );
  const customer = useSelector(
    (state: RootState) => state.customers.customers[customerId!] || {}
  );

  const handlePlaceOrder = useCallback(async () => {
    try {
      await placeOrder(customerId!, data!);

      // The order has been placed, go back.
      history.goBack();
    } catch (e) {
      // TODO: Show an error message.
      console.error(e);
    }
  }, [customerId, data, history]);

  const handleAddProduct = useCallback(
    async (product: Product) => {
      try {
        const updatedOrder = await addOrderProduct(customerId!, product);
        dispatch(orderUpdate(updatedOrder));
      } catch (e) {
        // TODO: Show an error message.
        console.error(e);
      }
    },
    [dispatch, customerId]
  );

  if (!customerId) {
    return <Redirect to="/" />;
  }

  if (error) {
    return (
      <p>
        Something went wrong when loading the order for customer {customerId}
      </p>
    );
  }

  if (loading || !data) {
    return <p>loading...</p>;
  }

  return (
    <section className="OrderDetails">
      <h2>
        Order details for {customer ? customer.name : `customer ${customerId}`}
      </h2>
      <h3>Contents:</h3>
      <table className="OrderDetails_table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Unit price</th>
            <th>Amount</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map(item => (
            <ItemRow
              key={item["product-id"]}
              item={item}
              customerId={customerId}
            />
          ))}
        </tbody>
      </table>
      <h3>Total: $ {data.total}</h3>
      <button onClick={handlePlaceOrder}>Place Order</button>

      <ProductList orderCallback={handleAddProduct} />
    </section>
  );
}
