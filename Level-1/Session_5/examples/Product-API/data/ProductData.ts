// Rating: { "sondos": 2 } called Index Signature
export interface Rate {
  [username: string]: number; 
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  rates: Rate[];
}

export const products_data: Product[] = [
  {
    id: 1,
    name: "Bluetooth Speaker",
    description: "Portable speaker with deep bass and long battery life.",
    price: 59.99,
    category: "Electronics",
    rates: [{ Adam: 4 }, { Lina: 5 }, { Karim: 3 }]
  },
  {
    id: 2,
    name: "Tablet Pro",
    description: "10-inch tablet suitable for work and entertainment.",
    price: 399.99,
    category: "Electronics",
    rates: [{ Nour: 2 }, { Youssef: 4 }]
  },
  {
    id: 3,
    name: "Mechanical Keyboard",
    description: "RGB mechanical keyboard with blue switches.",
    price: 89.99,
    category: "Accessories",
    rates: [{ Salma: 5 }, { Omar: 4 }, { Hana: 5 }]
  }
];
