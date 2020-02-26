import order1 from "./mockData/order1.json";
import order2 from "./mockData/order1.json";
import order3 from "./mockData/order1.json";
import customers from "./mockData/customers.json";
import products from "./mockData/products.json";

/**
 * Helper function for making the fake network calls more realistic.
 * @param delay Time in ms.
 */
function sleep(delay: number) {
  return new Promise(resolve => window.setTimeout(resolve, delay));
}

/**
 * Fetch a list of orders.
 */
export async function fetchOrders() {
  await sleep(500);
  return [order1, order2, order3] as Order[];
}

/**
 * Fetch a list of customers.
 */
export async function fetchCustomers() {
  await sleep(500);
  return customers as Customer[];
}

/**
 * Fetch a list of products.
 */
export async function fetchProducts() {
  await sleep(500);
  return products as Product[];
}
