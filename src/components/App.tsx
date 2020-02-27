import React, { useEffect } from "react";
import "./App.css";
import { HashRouter, Route, Switch, Redirect, Link } from "react-router-dom";
import OrderDetails from "./Order/OrderDetails";
import CustomerList from "./CustomerList";
import { useDispatch } from "react-redux";
import { loadCustomers, loadProducts } from "../redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCustomers());
    dispatch(loadProducts());
  }, [dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ordering coding challenge</h1>
      </header>
      <section className="App-content">
        <HashRouter>
          <Switch>
            <Route exact path="/customers">
              <CustomerList />
            </Route>

            <Route exact path="/customers/:customerId/orderDetails">
              <span className="breadcrumb">
                <Link to="/customers">Back to overview</Link>
              </span>
              <OrderDetails />
            </Route>

            <Redirect to="/customers" />
          </Switch>
        </HashRouter>
      </section>
    </div>
  );
}

export default App;
