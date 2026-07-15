/* ============================================
   Am Farouk's Koshary Cart Goes Digital
   Solution file 
============================================ */

// ---------- 1️⃣ Sync vs Async — Why Bother? ----------

// Blocking version
function cookRice(): void {
  console.log("Rice starting...");
  let total = 0;
  for (let i = 0; i < 300000000; i++) {
    total += i;
  }
  console.log("Rice done!");
}

console.log("--- Task 1: Sync ---");
cookRice();
console.log("Am Farouk yells at the next customer");
// The loop BLOCKS the call stack, so "yells" waits until cookRice() fully finishes.

// Non-blocking version
function cookRiceAsync(): void {
  console.log("Rice starting (async)...");
  setTimeout(() => {
    console.log("Rice done (async)!");
  }, 1000);
}

console.log("--- Task 1: Async ---");
cookRiceAsync();
console.log("Am Farouk yells at the next customer (async version)");
// setTimeout hands the work off and returns immediately, so "yells" fires
// right away, before "Rice done (async)!" even though it was called first.


// ---------- 2️⃣ Callbacks — The Rice Guy Finally Calls Back ----------

function orderRice(callback: (message: string) => void): void {
  console.log("Calling the rice supplier...");
  setTimeout(() => {
    callback("Rice delivered!");
  }, 1000);
}

console.log("--- Task 2 ---");
orderRice((message: string) => {
  console.log(message);
});
console.log("Am Farouk keeps serving customers while waiting");
// Order: "Calling the rice supplier..." -> "Am Farouk keeps serving..." -> (1s later) "Rice delivered!"


// ---------- 3️⃣ Promises — Promising the Customer Their Order ----------

const koshariOrder: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Order ready! 🍝");
  }, 2000);
});

koshariOrder
  .then((result: string) => console.log(result))
  .catch((err) => console.error(err));

const sauceOrder: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("We're out of da2a!");
  }, 500);
});

sauceOrder
  .then((result: string) => console.log(result))
  .catch((err) => console.error("Sauce problem:", err));


// ---------- 4️⃣ Promise Chaining — The Full Order Pipeline ----------

function getRice(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Rice ready"), 500);
  });
}

function getChickpeas(rice: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Chickpeas ready, rice was: " + rice), 500);
  });
}

function getSauce(chickpeas: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Sauce added, previous: " + chickpeas), 500);
  });
}

console.log("--- Task 5 ---");
getRice()
  .then((rice: string) => getChickpeas(rice))
  .then((chickpeas: string) => getSauce(chickpeas))
  .then((finalOrder: string) => console.log("Chain result:", finalOrder))
  .catch((err) => console.error("Chain failed:", err));


// ---------- 5️⃣ Async/Await — Am Farouk Learns to Chill ----------

async function makeKoshari(): Promise<void> {
  try {
    const rice: string = await getRice();
    const chickpeas: string = await getChickpeas(rice);
    const finalOrder: string = await getSauce(chickpeas);
    console.log("Async/Await result:", finalOrder);
  } catch (err) {
    console.error("Order failed:", err);
  }
}

makeKoshari();
// Same final string as Task 5's chain result, just flat and readable.