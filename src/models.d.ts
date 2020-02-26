// Models that are shared with the API.

interface Product {
  id: string;
  description: string;
  category: string;
  price: string;
}

interface Customer {
  id: string;
  name: string;
  since: string;
  revenue: string;
}

interface Item {
  "product-id": string;
  quantity: string;
  "unit-price": string;
  total: string;
}

interface Order {
  id: string;
  "customer-id": string;
  items: Item[];
  total: string;
}
