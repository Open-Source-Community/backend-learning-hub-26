/*
 * The Great Pizza Disaster of 2026
 * Author: Ahmed (hungry, tired, hopeful)
 * Description: A JavaScript survival guide for when you're starving,
 *              it's 2 AM, and Khaled can't find your building.
 *              Written with hunger, desperation, and a lot of console.log.
 */

// ─── 1. Values & Variables ───────────────────────────────────────────────────

let studentName = "Ahmed";        // let: can be reassigned later
const pizzaFlavor = "pepperoni";  // const: NEVER changing. Never.


// ─── 2. Data Types ───────────────────────────────────────────────────────────

let hungerLevel = 10;
let isPizzaHot = true;
let deliveryAddress = "123 Hungry St, Cairo";

console.log(typeof hungerLevel);     // "number"
console.log(typeof isPizzaHot);      // "boolean"
console.log(typeof deliveryAddress); // "string"


// ─── 3. Type Conversion & Coercion ───────────────────────────────────────────

let orderTotal = "85";              // string — Khaled's typo
let converted = Number(orderTotal); // explicit conversion → 85
let tip = 15;
let khaledBonus = Number(true);     // boolean coerced to number → 1

let totalPaid = converted + tip + khaledBonus;
console.log(totalPaid); // 101 — Khaled earned that extra pound


// ─── 4. Basic Operators ──────────────────────────────────────────────────────

let totalBill = converted + tip;   // 100
let minutesWaiting = 45 + 15;      // 60 — a FULL HOUR

let isEven = minutesWaiting % 2 === 0; // remainder operator
console.log(`Minutes waiting: ${minutesWaiting}`); // 60
console.log(`Is it even? ${isEven}`);              // true


// ─── 5. Operator Precedence ──────────────────────────────────────────────────

console.log(2 + 3 * 4 - 1);       // 13  → * runs first: 2 + 12 - 1 = 13
console.log((2 + 3) * (4 - 1));   // 15  → () forces order: 5 * 3 = 15
// If you guessed 19 for the first one... you're not alone.


// ─── 6. If / Else Statements ─────────────────────────────────────────────────

if (isPizzaHot && hungerLevel > 7) {
  console.log("OPEN THE DOOR AND SPRINT");
} else if (hungerLevel >= 5 && hungerLevel <= 7) {
  console.log("Walk, you have dignity");
} else {
  console.log("Order sushi next time");
}
// Output: "OPEN THE DOOR AND SPRINT"  (hunger is 10, pizza is hot)


// ─── 7. Statements & Expressions ─────────────────────────────────────────────

// Expression: produces a value — can live inside other code
let isHungry = hungerLevel > 5; // → true

// Statement: performs an action — cannot be used as a value
if (hungerLevel > 5) {
  console.log("Yes, very hungry");
}

// Why it matters: you can't write  let x = if(...){}
// Statements don't return values. Expressions do.


// ─── 8. Strings ──────────────────────────────────────────────────────────────

console.log(pizzaFlavor.toUpperCase());   // "PEPPERONI"
console.log(pizzaFlavor.length);          // 9
console.log(pizzaFlavor.includes("pepper")); // true ✓ (not pineapple)


// ─── 9. Template Literals ────────────────────────────────────────────────────

console.log(
  `Order summary: ${studentName} ordered ${pizzaFlavor} pizza. ` +
  `Total: ${totalBill} EGP. Waited: ${minutesWaiting} minutes. Worth it? Absolutely.`
);
// No + on the actual values — all embedded inside the template


// ─── 10. Intro to Arrays & Objects ───────────────────────────────────────────

let toppings = ["pepperoni", "olives", "mushrooms"];

let order = {
  customer: studentName,
  flavor: pizzaFlavor,
  isDelivered: false,
};

console.log(order.isDelivered); // false — still waiting...

// Pizza finally arrives!
order.isDelivered = true;
console.log(order.isDelivered); // true — FINALLY.


// ─── 11. Functions & Arrow Functions ─────────────────────────────────────────

// Calculates the total bill including tip
function calculateTotal(price, tip) {
  return price + tip;
}

// Same thing as an arrow function — shorter syntax
const calculateTotalArrow = (price, tip) => price + tip;

console.log(calculateTotal(85, 15));       // 100
console.log(calculateTotalArrow(85, 15));  // 100 ✓ — same result


// ─── 12. Loops ───────────────────────────────────────────────────────────────

let stops = ["Ahmed", "Sara", "Mona", "Tarek"];

for (let i = 0; i < stops.length; i++) {
  console.log(`Delivering to ${stops[i]}...`);
  if (stops[i] === "Ahmed") {
    break; // Ahmed is first. Obviously.
  }
}
// Output:
// "Delivering to Ahmed..."  ← stops here. Khaled moves on with his life.


// ─── 13. Comments — you're reading them! ────────────────────────────────────
// (See the multi-line comment at the top of this file and the single-line
//  comment above calculateTotal — both count.)

// Pizza retrieved. Dignity preserved. JavaScript learned. 🍕