import order1 from "./mockData/order1.json";
import order2 from "./mockData/order2.json";
import order3 from "./mockData/order3.json";
import customers from "./mockData/customers.json";
import products from "./mockData/products.json";

// Keep all possible orders in a map.
const orders = [order1, order2, order3].reduce<Record<string, Order>>(
  (acc, cur) => ({ ...acc, [cur["customer-id"]]: cur }),
  {}
);

/**
 * Helper function for making the fake network calls more realistic.
 * @param delay Time in ms.
 */
function sleep(delay: number) {
  return new Promise(resolve => window.setTimeout(resolve, delay));
}

/**
 * Update the 'total' fields in the order object.
 * This function is just to keep the mock data correct, this should be handled on the server.
 * @param order The order to update.
 */
function syncOrderPrices(order: Order): Order {
  const round = (num: number) => Math.round(num * 100) / 100;
  let total = 0;
  const items = order.items.map(item => {
    const subTotal =
      parseInt(item.quantity, 10) * parseFloat(item["unit-price"]);
    total += subTotal;
    return {
      ...item,
      total: String(round(subTotal))
    };
  });

  return {
    ...order,
    items,
    total: String(round(total))
  };
}

/**
 * Fetch 1 order for a customer.
 * @param customerId The customer id.
 */
export async function fetchOrder(customerId: string) {
  await sleep(500);

  if (orders[customerId] !== undefined) {
    return orders[customerId];
  }

  throw new Error("404: Order not found");
}

/**
 * Delete 1 product from an order.
 * @param customerId The customer id.
 * @param productId The product.
 */
export async function deleteOrderProduct(customerId: string, product: Product) {
  await sleep(500);

  if (orders[customerId]) {
    const updatedOrder = {
      ...orders[customerId],
      items: orders[customerId].items
        .map(item => {
          if (item["product-id"] === product.id) {
            return {
              ...item,
              quantity: String(parseInt(item.quantity, 10) - 1)
            };
          }

          return item;
        })
        .filter(item => item.quantity !== "0")
    };

    // Also keep the local api version of the orders up to date.
    orders[updatedOrder["customer-id"]] = updatedOrder;

    return syncOrderPrices(updatedOrder);
  }

  throw new Error("404: Order not found");
}

/**
 * Add 1 product to an order.
 * @param customerId The customer id.
 * @param product The product.
 */
export async function addOrderProduct(customerId: string, product: Product) {
  await sleep(500);

  if (orders[customerId]) {
    const item = orders[customerId].items.find(
      item => item["product-id"] === product.id
    ) || {
      "product-id": product.id,
      "unit-price": product.price,
      quantity: "0",
      total: "0"
    };

    const updatedItem = {
      ...item,
      quantity: String(parseInt(item.quantity, 10) + 1)
    };
    const updatedOrder = {
      ...orders[customerId],
      items: [
        ...orders[customerId].items.filter(
          item => item["product-id"] !== product.id
        ),
        updatedItem
      ]
    };

    // Also keep the local api version of the orders up to date.
    orders[updatedOrder["customer-id"]] = updatedOrder;

    return syncOrderPrices(updatedOrder);
  }

  throw new Error("404: Order not found");
}

/**
 * Place the customer's order.
 * @param customerId The customer id.
 * @param order The order.
 */
export async function placeOrder(customerId: string, order: Order) {
  await sleep(500);
  console.log(`The order for customer ${customerId} has been placed!`, order);

  delete orders[customerId];

  return { msg: "succes!" };
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
