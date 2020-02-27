import React, { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux";
import { Link } from "react-router-dom";

const WithCustomerHeader: FC = ({ children }) => (
  <>
    <h2>Customer list</h2>
    {children}
  </>
);

export default function CustomerList() {
  const { loading, customers, error } = useSelector(
    (state: RootState) => state.customers
  );

  if (loading) {
    return (
      <WithCustomerHeader>
        <p>loading...</p>
      </WithCustomerHeader>
    );
  }

  if (error) {
    return (
      <WithCustomerHeader>
        <p>Something went wrong!</p>
      </WithCustomerHeader>
    );
  }

  return (
    <WithCustomerHeader>
      <ul>
        {Object.values(customers).map(customer => (
          <li key={customer.id}>
            <Link to={`/customers/${customer.id}/orderDetails`}>
              {customer.name}
            </Link>
          </li>
        ))}
      </ul>
    </WithCustomerHeader>
  );
}
