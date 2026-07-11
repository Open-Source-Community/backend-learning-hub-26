/**
 * 🕵️ THE CODEMART INCIDENT — SOLUTION FILE
 * -----------------------------------------
 * This is the fully worked solution to codemart_tasks.md.
 * Try the tasks yourself first — this file is for checking your work,
 * not for copy-pasting before you've thought about it.
 *
 * Run with: npx ts-node codemart_solution.ts
 */

// =========================================================================
// PART 0 — THE CRIME SCENE (plain JS behavior, explained here in comments)
// =========================================================================
//
// 1) The printed total is NaN. "250 EGB" * 2 tries to coerce "250 EGB" to a
//    number, fails (it's not a clean numeric string), and produces NaN.
//    From there, NaN propagates through every further calculation — NaN + 100
//    is NaN, and NaN - "50" is still NaN. Critically, JavaScript does NOT
//    throw an error for any of this. It just quietly returns NaN and moves
//    on, so `console.log` prints NaN and the program keeps running as if
//    nothing went wrong. In a real backend this could mean an invoice sent
//    to a customer literally saying they owe "NaN EGP" — or worse, a NaN
//    silently flowing into a database column typed as a float and getting
//    stored as null/0 depending on the driver, with no error anywhere in
//    the logs pointing at the actual cause.
// 2) `order.shippingAddress.city` crashes with "Cannot read properties of
//    undefined (reading 'city')" because `shippingAddress` was never set on the
//    object at all, and JS happily lets you try to access `.city` on `undefined`
//    at runtime — there is no earlier warning that this field doesn't exist.
// 3) Customers would see a wrong invoice total in bug #1, and in bug #2 the
//    ENTIRE checkout server process could crash for every customer, not just
//    the one with the missing address, if this ran in a shared request handler
//    without proper isolation.

// =========================================================================
// PART 1 — HOW THE PROBLEM IS SOLVED
// =========================================================================

function calculateOrderTotal(items: { price: number; qty: number }[], discount: number): number {
  return items.reduce((total, item) => total + item.price * item.qty, 0) - discount;
}

// The following call would NOT compile — left commented out on purpose:
//
// const brokenOrder = {
//   customer: "Layla",
//   items: [
//     { price: "250 EGB", qty: 2 },
//     { price: 100, qty: 1 },
//   ],
// };
// calculateOrderTotal(brokenOrder.items, "50");
//
// Compiler error (paraphrased for a non-technical manager):
// "You're trying to hand me a price written as text ('250 EGB') where I
// expect an actual number, and a discount written as text ('50') where I
// also expect a number. I'm stopping you right now, at write-time, instead
// of letting this silently turn into NaN on a customer's invoice."

// =========================================================================
// PART 2 — WHAT IS TYPESCRIPT (modeling real states)
// =========================================================================

type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";

function canCancelOrder(status: OrderStatus): boolean {
  return status === "pending" || status === "shipped";
}

// canCancelOrder("refunded"); // ❌ compile error: "refunded" is not assignable
// to type OrderStatus. In the old JS codebase, a typo like "deliverd" instead
// of "delivered" would have silently made canCancelOrder return false for a
// real delivered order and nobody would notice until a support ticket came in —
// potentially hours or days of confused debugging across two teams.

// =========================================================================
// PART 3 — TYPESCRIPT BASICS, USED FOR SOMETHING REAL
// =========================================================================

// (a) A tuple that means something
type WarehouseBin = [aisle: number, shelf: number];
const binForOrder: WarehouseBin = [4, 12];

// const badBin: WarehouseBin = [4, 12, "extra"]; // ❌ too many elements.
// This is good here because the barcode scanner integration is hardcoded to
// expect exactly two numbers (aisle, shelf) — a third value would silently
// break the scanner's parsing logic in production, so TypeScript catching
// the shape mismatch before deployment is exactly the safety net we want.

// (b) A generic Repository<T> — the real "aha" moment
class Repository<T extends { id: string }> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  findById(id: string): T | undefined {
    return this.items.find((item) => item.id === id);
  }
}

interface Product {
  id: string;
  name: string;
  price: number;
  costPrice: number; // internal, never shown to customers
}

interface Customer {
  id: string;
  name: string;
  email: string;
}

const productRepo = new Repository<Product>();
productRepo.add({ id: "p1", name: "Desk Lamp", price: 150, costPrice: 60 });
productRepo.add({ id: "p2", name: "Office Chair", price: 900, costPrice: 400 });
console.log(productRepo.findById("p1"));

const customerRepo = new Repository<Customer>();
customerRepo.add({ id: "c1", name: "Layla", email: "layla@example.com" });
console.log(customerRepo.findById("c1"));

// customerRepo.add({ id: "c2", name: "Sara" }); // ❌ missing 'email'.
// One generic class now safely powers products, customers, and (below)
// orders — instead of three separate hand-rolled findById functions, each
// with its own chance of a subtly different bug (e.g. `==` vs `===`,
// forgetting to handle "not found", or comparing the wrong field).

// =========================================================================
// PART 4 — INTERFACES DEEP DIVE (modeling the whole domain)
// =========================================================================

interface OrderItem {
  product: Product;
  qty: number;
}

interface Order {
  id: string;
  customer: string;
  items: OrderItem[];
  status: OrderStatus;
  shippedAt?: string;
  readonly createdAt: string;
}

const pendingOrder: Order = {
  id: "o1",
  customer: "Layla",
  items: [
    { product: { id: "p1", name: "Desk Lamp", price: 150, costPrice: 60 }, qty: 2 },
    { product: { id: "p2", name: "Office Chair", price: 900, costPrice: 400 }, qty: 1 },
  ],
  status: "pending",
  createdAt: new Date().toISOString(),
};

function shipOrder(order: Order): Order {
  return {
    ...order,
    status: "shipped",
    shippedAt: new Date().toISOString(),
  };
}

const shipped = shipOrder(pendingOrder);
console.log(shipped.status, shipped.shippedAt);

// pendingOrder.createdAt = "new date"; // ❌ Cannot assign to 'createdAt'
// because it is a read-only property. This is exactly the bug class where
// an order's audit history gets silently rewritten — readonly makes that a
// compile-time impossibility instead of a "how did this happen in the DB" ticket.

function calculateOrderItemsTotal(items: Order["items"]): number {
  return items.reduce((total, item) => total + item.product.price * item.qty, 0);
}

console.log("Order total:", calculateOrderItemsTotal(pendingOrder.items));

// =========================================================================
// PART 5 — UTILITY TYPES (stop repeating your interfaces)
// =========================================================================

type PublicProduct = Omit<Product, "costPrice">;
type CreateProductInput = Omit<Product, "id">;
type UpdateProductInput = Partial<Product>;
type ProductCatalog = Record<string, Product>;

function toPublicProduct(product: Product): PublicProduct {
  const { costPrice, ...publicFields } = product;
  return publicFields;
}

let nextProductId = 3;
function createProduct(input: CreateProductInput): Product {
  return { id: `p${nextProductId++}`, ...input };
}

function updateProduct(product: Product, changes: UpdateProductInput): Product {
  return { ...product, ...changes };
}

const catalog: ProductCatalog = {
  p1: { id: "p1", name: "Desk Lamp", price: 150, costPrice: 60 },
  p2: { id: "p2", name: "Office Chair", price: 900, costPrice: 400 },
};

console.log(catalog["p1"]);
console.log(toPublicProduct(catalog["p1"]));

const newProduct = createProduct({ name: "Standing Desk", price: 1200, costPrice: 700 });
console.log(newProduct);

const discountedLamp = updateProduct(catalog["p1"], { price: 120 });
console.log(discountedLamp);

// In the old JS codebase, if someone added `discountPercent` to the real
// Product shape but forgot to update the hand-written "public product" copy
// elsewhere, the two shapes would silently drift apart with no warning —
// the public copy might expose the WRONG discountPercent (undefined, or a
// stale value) and nobody would know until a customer complained.
// Because PublicProduct is DERIVED from Product with Omit<>, adding a new
// field to Product automatically flows into PublicProduct — there is no
// second copy to forget to update. The two can never quietly drift apart.

// =========================================================================
// PART 6 — CODE STRUCTURE PHILOSOPHIES (design notes, not code)
// =========================================================================
//
// For a small team like CodeMart (5 backend devs), COLOCATED types are
// usually better: `Order` and `OrderStatus` live right next to the order
// logic that owns them, so any dev can open one file and see the whole
// picture without hunting across the repo — fewer files, less ceremony,
// faster onboarding.
//
// For a large org (50+ devs across teams), CENTRALIZED types (or at least
// per-domain shared type packages) tend to win: many teams independently
// consume the same `Product` or `Order` shape (billing, warehouse, support
// dashboard), and colocating the type inside one team's feature folder
// creates fragile cross-team imports and merge conflicts every time two
// teams touch the same file. A shared `types/` package with clear ownership
// avoids that, at the cost of one extra "where do I find this type" lookup.

// =========================================================================
// PART 7 — SHAPE COMPATIBILITY (structural typing, the sneaky part)
// =========================================================================

function receiveFromWarehouse(product: Product): void {
  console.log("Received:", product.name);
}

function getExternalWarehouseData() {
  return { id: "w-99", name: "Desk Lamp", price: 150, costPrice: 60, extra: "ignored" };
}

receiveFromWarehouse(getExternalWarehouseData());
// ✅ Compiles. TypeScript uses STRUCTURAL typing: it doesn't care that this
// object was never declared as a `Product` — it only checks that every field
// `Product` requires is present with the right type. The extra `extra` field
// is irrelevant because the value is coming from a variable/return value,
// not a fresh object literal, so TypeScript doesn't run its stricter
// "excess property check" here.

// receiveFromWarehouse({ id: "w-1", name: "Chair", price: 90, costPrice: 40, extra: "oops" });
// ❌ Fails with "Object literal may only specify known properties, and
// 'extra' does not exist in type 'Product'." TypeScript is stricter with
// object literals written directly in a function call because that's the
// #1 place real typos happen (e.g. `pric` instead of `price`) — if it let
// literals through the same lenient check as variables, misspelled fields
// would silently become "extra ignored properties" instead of loud errors.

// =========================================================================
// FINAL BOSS — SHIP IT END-TO-END
// =========================================================================

type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };

function placeOrder(customer: string, items: OrderItem[]): Result<Order> {
  if (items.length === 0) {
    return { success: false, error: "Order must contain at least one item" };
  }

  const total = calculateOrderItemsTotal(items);
  if (total <= 0) {
    return { success: false, error: "Order total must be greater than zero" };
  }

  const order: Order = {
    id: `o${Math.floor(Math.random() * 10000)}`,
    customer,
    items,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  return { success: true, data: order };
}

const emptyResult = placeOrder("Layla", []);
if (emptyResult.success) {
  console.log("Order placed:", emptyResult.data.id);
} else {
  console.log("Failed:", emptyResult.error);
}

const realResult = placeOrder("Layla", pendingOrder.items);
if (realResult.success) {
  // TypeScript KNOWS `.data` exists here because `success` narrowed to `true`.
  console.log("Order placed:", realResult.data.id, "status:", realResult.data.status);
} else {
  console.log("Failed:", realResult.error);
}