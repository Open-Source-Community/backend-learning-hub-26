# 🕵️ The CodeMart Incident
> **The story:** You just joined **CodeMart**, a small online warehouse startup, as a junior backend dev. Their entire inventory + order system is written in plain JavaScript, and it has been silently losing the company money for months — wrong totals, orders marked "delivered" that were never shipped, crashes at 3 AM because someone forgot a field.
>
> Your manager doesn't want a lecture on TypeScript. She wants **proof** it would have stopped these bugs. Your job: take the actual buggy JS behavior below, migrate it to TypeScript step by step, and at each step write **one sentence** explaining which real bug that step would have prevented in production.
>
> This is one connected project, not disconnected snippets — code from earlier parts is reused later. Save it as `codemart.ts`, run with `npx ts-node codemart.ts`.

---

## 🐛 Part 0 — The Crime Scene (plain JS, run this first)

Paste this into `codemart.js` and run it with `node codemart.js`. This is CodeMart's *actual current code*.

```js
function calculateOrderTotal(items, discount) {
  let total = 0;
  for (const item of items) {
    total += item.price * item.qty;
  }
  return total - discount;
}

//by the frontend team
const order = {
  customer: "Layla",
  items: [
    { price: "250 EGP", qty: 2 },    
    { price: 100, qty: 1 },
  ],
};

console.log(calculateOrderTotal(order.items, "50")); 
console.log(order.shippingAddress.city); 
```

Run it. Look at what actually happens.

**Your task:** In a comment block, answer:
1. What is the actual printed value of the total, and why does JavaScript produce that instead of an error? (Hint: * and - try to coerce strings to numbers — what happens when the string isn't a clean number at all, like "250 EGB"?)
2. Why did `order.shippingAddress.city` crash the whole program instead of failing gracefully?
3. If this were a real backend, what would customers experience from each bug?

---

## 🎯 Part 1 — How the Problem is Solved

Rename the file `codemart.ts`. Re-type `calculateOrderTotal` with full annotations:

Try calling it with the **exact same buggy `order` object** from Part 0 (string price, string discount). Don't fix the data — just add the types and try to compile.

**Your task:** Comment above the broken call explaining the compiler error you get, in plain English, as if explaining it to your manager who doesn't code.

> 💡 **Why this matters:** the bug moved from "customer sees a wrong total in production" to "developer sees a red line before the code ever ships." That's the entire pitch of TypeScript in one exercise.

---
## 🧩 Part 2 — What is TypeScript (Modeling Reality, Not Just Variables)

CodeMart's real problem is that an order can be in different states, and JS lets you put an order in an *impossible* state (e.g., `delivered: true` but `shippedAt: null`). Model this properly:

```ts
type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";
```

**Your task:**
- Write a function `canCancelOrder(status: OrderStatus): boolean` that returns `true` only for `"pending"` or `"shipped"`, `false` otherwise.
- Try calling `canCancelOrder("refunded")` — it should fail to compile, because `"refunded"` was never a real status anyone defined. In a comment, explain how many hours of debugging this would have saved if a teammate had typo'd `"deliverd"` somewhere in the old JS codebase.

---

## 🏗️ Part 3 — TypeScript Basics, Used for Something Real

### a) A tuple that means something
Warehouse bins are stored as `[aisle, shelf]`. Instead of a vague array, model it precisely:
```ts
type WarehouseBin = [aisle: number, shelf: number];
const binForOrder: WarehouseBin = [4, 12];
```
Explain in a comment why `const badBin: WarehouseBin = [4, 12, "extra"]` fails, and why that's *good* here (a real scanner integration expects exactly 2 values).

### b) A generic `Repository<T>` 
CodeMart has three collections: products, customers, orders. In the old JS code, someone copy-pasted `findById` three times with three slightly different bugs. Fix it **once**, generically:

```ts
class Repository<T extends { id: string }> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  findById(id: string): T | undefined {
    return this.items.find((item) => item.id === id);
  }
}
```

**Your task:**
- Define `interface Product { id: string; name: string; price: number }`
- Create `const productRepo = new Repository<Product>()`, add two products, and call `findById`
- Reuse the **same class** for a `Customer` type of your own design
- In a comment: explain why this one generic class replaces three copy-pasted, bug-prone functions, and what happens (type-wise) if you try to `.add()` an object missing `id`.

---

## 🧱 Part 4 — Interfaces Deep Dive (Modeling the Whole Domain)

Design CodeMart's real domain, with relationships:

```ts
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
```

**Your task:**
- Build one full `Order` object representing a real pending order (no `shippedAt`, since it hasn't shipped)
- Write `shipOrder(order: Order): Order` that returns a **new** order object with `status: "shipped"` and `shippedAt` set to a timestamp — do not mutate the original
- Try (in a comment) writing `order.createdAt = "new date"` directly and explain why `readonly` stops the exact class of bug where an order's history gets silently rewritten
- Rewrite `calculateOrderTotal` from Part 1 to accept `Order["items"]` (an `OrderItem[]`) instead of a loose array shape, and use it on your order

---

## 🔧 Part 5 — Utility Types (Stop Repeating Your Interfaces)

CodeMart's frontend team needs three *different views* of `Product`, and the old JS code had three hand-written, slowly-diverging copies of the product shape. Fix it by **deriving** instead of duplicating:

```ts
// What the customer-facing API is allowed to return — never leak costPrice
type PublicProduct = Omit<Product, "costPrice">;

// What's required to create a new product — no id yet, the DB assigns it
type CreateProductInput = Omit<Product, "id">;

// What's allowed when editing a product — any subset of fields
type UpdateProductInput = Partial<Product>;

// A fast lookup table by product id
type ProductCatalog = Record<string, Product>;
```

**Your task:**
- Write `toPublicProduct(product: Product): PublicProduct` that strips `costPrice`
- Write `createProduct(input: CreateProductInput): Product` that generates a fake `id` (e.g. `crypto.randomUUID()` or a counter) and returns a full `Product`
- Write `updateProduct(product: Product, changes: UpdateProductInput): Product` that merges changes into the original using `{ ...product, ...changes }`
- Build a `ProductCatalog` with 2 products and look one up by id
- In a comment: explain what would have happened in the old JS codebase if someone added a `discountPercent` field to `Product` but forgot to update the "public" copy by hand — and why that can't silently happen anymore.

---

## 🗂️ Part 6 — Code Structure Philosophies (Think Like a Team, Not a Script)

No new syntax here — this is a design decision CodeMart's team actually argued about.

**Your task (write as comments, 3–5 sentences total):**
- CodeMart's codebase currently has all types (`Product`, `Order`, `OrderStatus`...) mixed directly into the same files as the logic that uses them. Compare two philosophies:
  1. **Colocated types** — define each type right next to the function/class that primarily owns it
  2. **Centralized types** — one `types.ts` that every file imports from
- State which one you'd choose for a small team like CodeMart (5 backend devs) vs. a large one (50+ devs across teams), and *why* — tie it back to a concrete pain point (e.g. merge conflicts, discoverability, circular imports).

---

## 🔀 Part 7 — Shape Compatibility (Structural Typing, the Sneaky Part)

CodeMart's warehouse partner sends product data from an external system that has **no idea your `Product` interface even exists** — it just sends JSON that happens to match:

```ts
function getExternalWarehouseData() {
  return { id: "w-99", name: "Desk Lamp", price: 150, costPrice: 60, extra: "ignored" };
}
```

**Your task:**
- Write `receiveFromWarehouse(product: Product): void { ... }` that logs the product name
- Call it as `receiveFromWarehouse(getExternalWarehouseData())` — this **compiles**, even though that function has an extra `extra` field and was never declared as a `Product`. Explain in a comment *why* this works (structural typing / "if it has the shape, it fits").
- Now call it with an **object literal** directly: `receiveFromWarehouse({ id: "w-1", name: "Chair", price: 90, costPrice: 40, extra: "oops" })`. This time it **fails** with an excess property error. In a comment, explain why TypeScript is stricter with fresh object literals than with pre-existing variables/return values — and why that's actually protecting you from typos, not annoying you for no reason.

---

## 🚀 Final Boss — Ship It End-to-End

Tie everything together with a discriminated-union result type — the pattern real backend APIs use instead of throwing random exceptions:

```ts
type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };
```

**Your task:** Write `placeOrder(customer: string, items: OrderItem[]): Result<Order>` that:
- Returns `{ success: false, error: "Order must contain at least one item" }` if `items` is empty
- Otherwise builds a valid `Order` (status `"pending"`, `createdAt` set, using `calculateOrderTotal` from Part 1/4 to sanity-check the total is > 0) and returns `{ success: true, data: order }`

Call it once with an empty array and once with real items, and handle both cases with an `if (result.success)` check — notice TypeScript **automatically knows** `result.data` only exists inside the `true` branch. That's the discriminated union doing its job.

---

## Expected output hints

| Part | What you should see |
|------|----------------------|
| Part 0 | Wrong total printed (string glued on), then a hard crash on `shippingAddress` |
| Part 1 | Compile error on the string price/discount call — never runs, never ships |
| Part 2 | `canCancelOrder("refunded")` fails to compile — "refunded" isn't assignable to `OrderStatus` |
| Part 3b | One `Repository<T>` class powers both products and customers with zero copy-paste |
| Part 4 | `order.createdAt = "..."` errors: "Cannot assign to 'createdAt' because it is a read-only property" |
| Part 5 | `PublicProduct` never has `costPrice`, even if you try to sneak it in |
| Part 7 | Passing a variable with extra fields works; passing a literal with extra fields fails |
| Final Boss | `result.data` is only accessible after narrowing `result.success === true` |

*Run with `npx ts-node codemart.ts`. Welcome to the team.* 🕵️