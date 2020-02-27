import order1 from "../mockData/order1.json";
import customers from "../mockData/customers.json";
import products from "../mockData/products.json";

export async function fetchOrder(customerId: string) {
  return Promise.resolve(order1);
}

export async function deleteOrderProduct(customerId: string, product: Product) {
  return Promise.resolve(order1);
}

export async function addOrderProduct(customerId: string, product: Product) {
  return Promise.resolve(order1);
}

export async function placeOrder(customerId: string, order: Order) {
  return Promise.resolve({ msg: "succes!" });
}

export async function fetchCustomers() {
  return Promise.resolve(customers as Customer[]);
}

export async function fetchProducts() {
  return Promise.resolve(products as Product[]);
}
