function calculateOrderTotal(items: Array<{ price: number; qty: number }>, discount: number): number {
  let total: number = 0;
  for (const item of items) {
    total += item.price * item.qty;
  }
  return total - discount;
}

//by the frontend team
const order1 = {
  customer: "Layla",
  items: [
    { price: "250 EGP", qty: 2 },    
    { price: 100, qty: 1 },
  ],
};

//console.log(calculateOrderTotal(order1.items, "50")); 
// console.log(order1.shippingAddress.city); 

// What is the actual printed value of the total, and why does JavaScript produce that instead of an error?
//NaN,becsuse the first item price is a string and the second is a number
// Why did order1.shippingAddress.city crash the whole program instead of failing gracefully?
// Because the shippingAddress property is undefined
// If this were a real backend, what would customers experience from each bug?
//customers will see an error message.

//explaining the compiler error you get, in plain English, as if explaining it to your manager who doesn't code.
// function expects the price to be a number ,shippingAddress is not defined


type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";

function canCancelOrder(status: OrderStatus): boolean{
  if (status === "pending" || status === "shipped") {
    return true;
  }
  return false;
}


//console.log(canCancelOrder("refunded"));
//explain how many hours of debugging this would have saved if a teammate had typo'd "deliverd" somewhere in the old JS codebase.
//alotof time

type WarehouseBin = [aisle: number, shelf: number];
const binForOrder: WarehouseBin = [4, 12];

//why const badBin: WarehouseBin = [4, 12, "extra"] fails, and why that's good here
// The "extra" string does not match the expected types,This is good because it ensures that the data structure matches the expected format

class Repository<T extends { id: string }> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  findById(id: string): T | undefined {
    return this.items.find((item) => item.id === id);
  }
}

interface Product1 { id: string; name: string; price: number }
interface Customer { id: string; name: string; age: string }

const productRepo = new Repository<Product1>()

productRepo.add({id:"1",name:"apple",price:70});
productRepo.add({id:"2",name:"banana",price:50});

const customerRepo = new Repository<Customer>()

customerRepo.add({id:"11",name:"yass",age:"21"});

//why this one generic class replaces three copy-pasted, bug-prone functions, and what happens (type-wise) if you try to .add() an object missing id
// it allows us to create a repository for any type , TypeScript will throw a compile-time error

interface Product {
  id: string;
  name: string;
  price: number;
  costPrice: number; // internal, never shown to customers
}

interface OrderItem {
  product: Product;
  qty: number;
}

interface Order {
  id: string;
  customer: string;
  items: OrderItem[];
  status: OrderStatus;        // reuse Part 2's type
  shippedAt?: string;         // optional — only exists once shipped
  readonly createdAt: string; // set once, never changes
}

const firstorder:Order={
  id: "1",
  customer: "11",
  items: [{product: {id: "1", name: "apple", price: 70, costPrice: 50}, qty: 2}],
  status: "pending",
  createdAt:"7/7/2026"
}

function shipOrder(order: Order): Order {
    return {
        ...order,
        status: "shipped",
        shippedAt: new Date().toISOString(),
    };
}

// Try (in a comment) writing order.createdAt = "new date" directly and explain why readonly stops the exact class of bug where an order's history gets silently rewritten
// order.createdAt = "new date"; //compile-time error because of 'readonly' 
// Rewrite calculateOrderTotal from Part 1 to accept Order["items"] (an OrderItem[]) instead of a loose array shape, and use it on your order
function calculateOrderTotal2(items: Order["items"], discount: number): number {
  let total: number = 0;
  for (const item of items) {
    total += item.product.price * item.qty;
  }
  return total - discount;
}

const total = calculateOrderTotal2(firstorder.items, 50);
console.log(total);


// What the customer-facing API is allowed to return — never leak costPrice
type PublicProduct = Omit<Product, "costPrice">;

// What's required to create a new product — no id yet, the DB assigns it
type CreateProductInput = Omit<Product, "id">;

// What's allowed when editing a product — any subset of fields
type UpdateProductInput = Partial<Product>;

// A fast lookup table by product id
type ProductCatalog = Record<string, Product>;


function toPublicProduct(product: Product): PublicProduct{
  return {
    id: product.id,
    name: product.name,
    price: product.price
  };
}

function createProduct(input: CreateProductInput): Product {
  const newProduct: Product = {
    id: crypto.randomUUID(),
    name: input.name,
    price: input.price,
    costPrice: input.costPrice
  };
  return newProduct;
}

function updateProduct(product: Product, changes: UpdateProductInput): Product {
  return { ...product, ...changes };
}

const catalog: ProductCatalog = {
  P1: {
    id: "P1",
    name: "strawberry",
    price: 60,
    costPrice: 80,
  },
  P2: {
    id: "P2",
    name: "watermelon",
    price: 200,
    costPrice: 250,
  },
};

const batee5 = catalog["P2"];
//explain what would have happened in the old JS codebase if someone added a discountPercent field to Product but forgot to update the "public" copy by hand — and why that can't silently happen anymore.
//bugs,TS ensures that any changes to the Product interface are reflected in the PublicProduct type

// Your task (write as comments, 3–5 sentences total):
/*
  based on the size of the team, I would choose colocated types for a small team like CodeMart (5 backend devs) because it allows for better discoverability and easier maintenance of types alongside the logic that uses them.
  This reduces the risk of merge conflicts since changes to types are localized to the files where they are used.
  For a large team (50+ devs across teams), I would opt for centralized types in a single types.
  ts file to ensure consistency across the codebase and avoid circular imports, as well as to facilitate collaboration and reduce duplication of type definitions.
*/

function getExternalWarehouseData() {
  return { id: "w-99", name: "Desk Lamp", price: 150, costPrice: 60, extra: "ignored" };
}

function receiveFromWarehouse(product: Product): void {
  console.log(`product: ${product.name}`);
}

// Call it as receiveFromWarehouse(getExternalWarehouseData()) — this compiles, even though that function has an extra extra field and was never declared as a Product. Explain in a comment why this works (structural typing / "if it has the shape, it fits").
receiveFromWarehouse(getExternalWarehouseData()); 
// because TypeScript uses structural typing

// Now call it with an object literal directly: receiveFromWarehouse({ id: "w-1", name: "Chair", price: 90, costPrice: 40, extra: "oops" }). This time it fails with an excess property error. In a comment, explain why TypeScript is stricter with fresh object literals than with pre-existing variables/return values — and why that's actually protecting you from typos, not annoying you for no reason.
receiveFromWarehouse({ id: "w-1", name: "Chair", price: 90, costPrice: 40, extra: "oops" })
// TypeScript is stricter with fresh object literals because it cannot assume that the additional properties are intentional or correct. It's better to explicitly define the type or use a type assertion if you're sure about the extra properties.

type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };

  
function placeOrder(customer: string, items: OrderItem[]): Result<Order> {
  if (items.length === 0) {
    return { success: false, error: "Order must contain at least one item" };
  }

  const total = calculateOrderTotal2(items, 0);
  if (total <= 0) {
    return { success: false, error: "Order total must be greater than zero" };
  }

  const order: Order = {
    id: crypto.randomUUID(),
    customer,     
    items,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  return { success: true, data: order };
}

const emptyResult = placeOrder("Yass", []);
if (emptyResult.success) {
  console.log("Created order:", emptyResult.data);
} else {
  console.log(emptyResult.error);
}

const filledResult = placeOrder("Yass", [
  {
    product: { id: "P1", name: "apple", price: 70, costPrice: 50 },
    qty: 2,
  },
]);

if (filledResult.success) {
  console.log("Created order:", filledResult.data);
} else {
  console.log(filledResult.error);
}
