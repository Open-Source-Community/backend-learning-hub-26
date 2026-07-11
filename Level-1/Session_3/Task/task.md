# 🥙 Am Farouk's Koshary Cart Goes Digital

> **The story:** You are Am Farouk, owner of the most legendary koshary cart in Downtown Cairo. Business is booming — too booming. Orders are piling up, the rice guy calls back late, and you keep promising customers "دقيقتين بس" while it's clearly been ten. Your mission: write a JavaScript program to bring some async sanity to the chaos before someone starts a fight over extra da2a.


---

## Tasks

### 1️⃣ Sync vs Async — Why Bother?
Write a function `cookRice()` that uses a heavy `for` loop (count to a few hundred million) to simulate **blocking** work — log `"Rice starting..."` before it and `"Rice done!"` after.

Then write `cookRiceAsync()` using `setTimeout` to simulate the same thing **without blocking**.

Call both, with a `console.log("Am Farouk yells at the next customer")` right after each call. Notice which one lets Am Farouk keep yelling immediately, and which one makes him freeze mid-sentence. Add a comment explaining why.

---

### 2️⃣ Callbacks — The Rice Guy Finally Calls Back
Write `orderRice(callback)` that logs `"Calling the rice supplier..."` then uses `setTimeout` (1000ms) to call `callback("Rice delivered!")`.

Call it like this:
```js
orderRice((message) => {
  console.log(message);
});
console.log("Am Farouk keeps serving customers while waiting");
```
Confirm the log order matches what you'd expect from an async callback.

---

### 3️⃣ Promises — Promising the Customer Their Order
Create a Promise `koshariOrder` that resolves with `"Order ready! 🍝"` after 2 seconds using `setTimeout` inside it.

Use `.then()` to log the result, and `.catch()` just in case (even though this one always succeeds).

Then make a second Promise, `sauceOrder`, that **rejects** with `"We're out of da2a!"` — and handle that with `.catch()` too.

---

### 4️⃣ Promise Chaining — The Full Order Pipeline
Write three functions that each return a Promise (using `setTimeout` inside):
- `getRice()` → resolves `"Rice ready"`
- `getChickpeas(rice)` → resolves `"Chickpeas ready, rice was: " + rice`
- `getSauce(chickpeas)` → resolves `"Sauce added, previous: " + chickpeas`

Chain them with `.then()` so the final `.then()` logs the complete order, and add one `.catch()` at the end for the whole chain.

---

### 5️⃣ Async/Await — Am Farouk Learns to Chill
Rewrite Task 4's chain using an `async function makeKoshari()` with `await` on each step, wrapped in `try/catch`.

Log the final result and confirm it matches Task 5's output exactly — same result, way less indentation.

---

## Expected output hints

| Task | What happens |
|------|---------------|
| Task 1 | `cookRice()` blocks — "yells" log waits. `cookRiceAsync()` doesn't — "yells" log fires immediately |
| Task 2 | `"Calling the rice supplier..."` → `"Am Farouk keeps serving..."` → (1s later) `"Rice delivered!"` |
| Task 4 | `koshariOrder` → `"Order ready! 🍝"` after 2s. `sauceOrder` → caught error `"We're out of da2a!"` |
| Task 6 | Same final string as Task 5, just flatter code |

---

Good luck, Am Farouk — el zabayen mestannieen.* 🥙