# Session 3: Asynchronous JavaScript & Node.js Runtime

## 📋 Session Agenda

**Asynchronous JavaScript & Node.js Fundamentals**
1. Why Asynchronous Programming? 
2. Callbacks 
3. Timers: setTimeout & setInterval 
4. Promises 
5. Async/Await
6. Node.js Runtime Deep Dive 

---

## 📚 Session Objectives

By the end of this session, you will be able to:

1. Understand the difference between synchronous and asynchronous code
2. Master callback patterns and understand callback hell
3. Work with timers (setTimeout, setInterval)
4. Use Promises to handle async operations
5. Write clean async code with async/await
6. Understand how Node.js runtime works (Event Loop)

---

# Asynchronous JavaScript Patterns

## 1️⃣ Why Asynchronous Programming?

### The Problem with Synchronous Code

Imagine you're cooking dinner:

**Synchronous Approach (Blocking):**
```
1. Put water on stove → WAIT until it boils (10 min)
2. Cut vegetables → WAIT until done (5 min)
3. Cook rice → WAIT until done (20 min)
Total: 35 minutes of standing around!
```

**Asynchronous Approach (Non-blocking):**
```
1. Put water on stove (starts boiling in background)
2. While water boils → Cut vegetables
3. While vegetables cook → Prepare rice
Total: 20 minutes, everything done in parallel!
```

### Code Example: The Difference

**Synchronous (Blocking):**
```typescript
// This blocks everything until done
function heavyComputation() {
  console.log("Start computation...");
  
  // Simulate heavy work that blocks
  let result = 0;
  for (let i = 0; i < 1000000000; i++) {
    result += i;
  }
  
  console.log("Computation complete!");
  return result;
}

console.log("Before");
heavyComputation(); // BLOCKS HERE - nothing else can run
console.log("After");

// Output:
// Before
// Start computation...
// [5 seconds pass... nothing else can happen]
// Computation complete!
// After
```

**Asynchronous (Non-blocking):**
```typescript
// This doesn't block, code continues
function heavyComputationAsync() {
  console.log("Start computation...");
  
  setTimeout(() => {
    console.log("Computation complete!");
  }, 2000);
}

console.log("Before");
heavyComputationAsync(); // Doesn't block!
console.log("After");

// Output:
// Before
// Start computation...
// After
// [2 seconds later...]
// Computation complete!
```

---

### Real-World Examples

**When You NEED Async:**
- 🌐 Making API calls (fetching data from servers)
- 📁 Reading/writing files
- 💾 Database queries
- ⏰ Setting timers or delays
- 👥 Handling multiple user requests

**Why Backend Needs Async:**
- Backend servers handle **hundreds/thousands** of requests simultaneously
- Without async, server would freeze waiting for each operation
- Async allows server to handle multiple operations at once
- Better performance and user experience

---

### Key Terminology

| Term | Meaning |
|------|---------|
| **Synchronous** | Code executes line by line, waits for each operation |
| **Asynchronous** | Code continues without waiting, operations happen in background |
| **Blocking** | Operation that stops code execution until complete |
| **Non-blocking** | Operation that allows code to continue while it works |

---

## what is the problem here?

```javascript
let data = getUser(); // ❌ this doesn't wait
let posts = getPosts(data.id); // ❌ this doesn't wait
```
* Async functions return immediately, not with results.
So you cannot "separate them" like normal sync functions.

* Therefore…
You MUST tell async function:

``` “When you're done, call this function.” ```

* Which leads to nested callbacks.

---
## 2️⃣ Callbacks

### What is a Callback?

A **callback** is simply a function passed as an argument to another function, to be executed later when something is done.

**Simple Analogy:**
Think of a callback like ordering food delivery:
1. You place an order (start async operation)
2. You give them your phone number (callback function)
3. You do other things while waiting
4. They call you when food arrives (callback is executed)

### Basic Callback Pattern

```typescript
// Simple callback example
function greet(name: string, callback: () => void) {
  console.log(`Hello ${name}!`);
  callback(); // Execute the callback
}

greet("Mohsen", () => {
  console.log("Callback executed!");
});

// Output:
// Hello Mohsen!
// Callback executed!
```

---

### Real Callback Example: API Fetch

```typescript
// Simulating an API call with callback
function fetchUserData(userId: number, callback: (data: any) => void) {
  console.log(`Fetching user ${userId}...`);
  
  // Simulate network delay
  setTimeout(() => {
    const userData = {
      id: userId,
      name: "Mohsen",
      email: "mohsen@example.com"
    };
    callback(userData);
  }, 1000);
}

// Using the callback
fetchUserData(123, (user) => {
  console.log("User data received:", user);
});

console.log("This runs immediately!");

// Output:
// Fetching user 123...
// This runs immediately!
// [1 second later...]
// User data received: { id: 123, name: 'Mohsen', ... }
```

---

### Error-First Callback Convention

In Node.js, callbacks follow a standard pattern:
- **First parameter:** error object (null if no error)
- **Second parameter:** result data

```typescript
// Error-first callback pattern
function fetchData(callback: (err: Error | null, data?: string) => void) {
  // Simulate async operation
  setTimeout(() => {
    const success = Math.random() > 0.3;
    
    if (success) {
      callback(null, "Data fetched successfully!");
    } else {
      callback(new Error("Failed to fetch data"));
    }
  }, 1000);
}

// Using the callback
fetchData((err, data) => {
  if (err) {
    console.error("Error:", err.message);
    return;
  }
  console.log("Success:", data);
});
```

---

### The Problem: Callback Hell 🔥

When you have multiple async operations that depend on each other, callbacks get nested deeply:

```typescript
// Callback Hell Example (Pyramid of Doom)
getUser(1, (err, user) => {
  getPosts(user.id, (err, posts) => {
    getComments(posts[0].id, (err, comments) => {
      getLikes(comments[0].id, (err, likes) => {
        console.log("Finally got everything!");
      });
    });
  });
});
```

**Problems with Callback Hell:**
- ❌ Hard to read (pyramid shape)
- ❌ Difficult to maintain
- ❌ Error handling is repetitive
- ❌ Hard to debug

**Solution?** → Promises and Async/Await! (coming up next)

---

## 3️⃣ Timers: setTimeout & setInterval

### setTimeout() - Delay Execution

Execute code **once** after a specified delay.

```typescript
// Basic setTimeout
setTimeout(() => {
  console.log("This runs after 2 seconds");
}, 2000);

// setTimeout with parameters
function greet(name: string, age: number) {
  console.log(`Hello ${name}, you are ${age} years old`);
}

setTimeout(greet, 3000, "Mohsen", 28);
```

**Syntax:**
```typescript
setTimeout(callback, delayInMilliseconds, arg1, arg2, ...);
```

---

### clearTimeout() - Cancel Delayed Execution

```typescript
// Set a timeout and save its ID
const timeoutId = setTimeout(() => {
  console.log("This will never run!");
}, 5000);

// Cancel it before it executes
clearTimeout(timeoutId);
console.log("Timeout cancelled!");
```

**Use Case:** Cancel operations when user navigates away or conditions change.

---

### setInterval() - Repeat Execution

Execute code **repeatedly** at specified intervals.

```typescript
// Basic setInterval
let count = 0;
const intervalId = setInterval(() => {
  count++;
  console.log(`Count: ${count}`);
  
  // Stop after 5 times
  if (count === 5) {
    clearInterval(intervalId);
    console.log("Interval stopped!");
  }
}, 1000);

// Output:
// Count: 1 (after 1 sec)
// Count: 2 (after 2 sec)
// Count: 3 (after 3 sec)
// Count: 4 (after 4 sec)
// Count: 5 (after 5 sec)
// Interval stopped!
```

---

### Practical Timer Examples

**Example 1: Rate Limiting**
```typescript
// Limit API calls to once per second
let lastCallTime = 0;

function makeApiCall() {
  const now = Date.now();
  
  if (now - lastCallTime < 1000) {
    console.log("Rate limited! Please wait...");
    return;
  }
  
  lastCallTime = now;
  console.log("API call made!");
  // Make actual API call here
}

// Try calling multiple times quickly
makeApiCall(); // "API call made!"
makeApiCall(); // "Rate limited! Please wait..."
setTimeout(() => makeApiCall(), 1500); // "API call made!" (after 1.5s)
```

**Example 2: Simple Polling**
```typescript
// Check for updates every 5 seconds
function pollForUpdates() {
  setInterval(() => {
    console.log("Checking for updates...");
    
    // Simulate checking server
    const hasUpdates = Math.random() > 0.7;
    
    if (hasUpdates) {
      console.log("New updates available!");
    }
  }, 5000);
}

pollForUpdates();
```

**Example 3: Countdown Timer**
```typescript
function countdown(seconds: number) {
  let remaining = seconds;
  
  console.log(`${remaining} seconds remaining...`);
  
  const intervalId = setInterval(() => {
    remaining--;
    
    if (remaining > 0) {
      console.log(`${remaining} seconds remaining...`);
    } else {
      clearInterval(intervalId);
      console.log("Time's up!");
    }
  }, 1000);
}

countdown(5);
```

---

### ⚠️ Common Timer Pitfalls

**1. Not Clearing Intervals (Memory Leaks)**
```typescript
// ❌ BAD: Interval never stops
function startPolling() {
  setInterval(() => {
    console.log("Polling...");
  }, 1000);
}
startPolling(); // Runs forever!

// ✅ GOOD: Save ID and clear when done
function startPolling() {
  const intervalId = setInterval(() => {
    console.log("Polling...");
  }, 1000);
  
  return () => clearInterval(intervalId); // Return cleanup function
}

const stopPolling = startPolling();
// Later...
setTimeout(stopPolling, 5000); // Stop after 5 seconds
```

**2. Zero Delay Doesn't Mean Immediate**
```typescript
console.log("1");

setTimeout(() => {
  console.log("2");
}, 0); // Zero delay!

console.log("3");

// Output: 1, 3, 2 (not 1, 2, 3!)
// Why? Event loop processes setTimeout after current code
```

---

## 4️⃣ Promises

### What Problems Do Promises Solve?

Remember callback hell? Promises make async code:
- ✅ Easier to read (no pyramid of doom)
- ✅ Easier to error handle
- ✅ Easier to chain operations
- ✅ Composable and reusable
---
## What is a Promise?

A **Promise** is an object that represents the **result of an asynchronous operation**.

In simple words:

> **A Promise is a placeholder for a value that you will receive in the future.**

Think of ordering food from a restaurant.

- You place your order.
- The food is not ready immediately.
- The restaurant promises that later it will either:
  - Deliver your food ✅
  - Tell you something went wrong ❌

A JavaScript Promise works exactly the same way.

---

## Creating a Promise

```js
const promise = new Promise((resolve, reject) => {

});
```

This means:

> "Create a Promise and tell me what asynchronous work you want to perform."

---

## What are `resolve` and `reject`?

When creating a Promise, JavaScript automatically provides **two functions**:

```js
(resolve, reject)
```

They are simply **function parameters**.

JavaScript could have named them anything.

For example:

```js
new Promise((success, failure) => {

});
```

works exactly the same.

However, everyone uses the names:

- `resolve`
- `reject`

because they clearly describe their purpose.

---

## What does `resolve()` do?

`resolve()` tells JavaScript:

> "The operation finished successfully."

Example:

```js
const promise = new Promise((resolve, reject) => {
    resolve("Done!");
});
```

The Promise changes from

```
Pending
```

to

```
Fulfilled
```

and stores the value

```
"Done!"
```

---

## What does `reject()` do?

`reject()` tells JavaScript:

> "The operation failed."

Example:

```js
const promise = new Promise((resolve, reject) => {
    reject("Something went wrong.");
});
```

The Promise changes from

```
Pending
```

to

```
Rejected
```

and stores the error message.

---

## Example: Downloading a File

```js
const download = new Promise((resolve, reject) => {

    setTimeout(() => {
        resolve("File downloaded!");
    }, 2000);

});
```

### What happens?

Immediately:

```
Pending
```

After 2 seconds:

```
Fulfilled

↓

"File downloaded!"
```

---

## Example: Login

```js
const login = new Promise((resolve, reject) => {

    const passwordCorrect = false;

    if (passwordCorrect)
        resolve("Welcome!");
    else
        reject("Wrong password");

});
```

If the password is correct:

```
Pending
↓

Fulfilled
↓

"Welcome!"
```

Otherwise:

```
Pending
↓

Rejected
↓

"Wrong password"
```

---

## Who calls `resolve()`?

**You do.**

Whenever your asynchronous work finishes successfully.

Example:

```js
new Promise((resolve, reject) => {

    // Do some work...

    resolve(result);

});
```

---

## Who calls `reject()`?

Also **you**.

Whenever something goes wrong.

```js
new Promise((resolve, reject) => {

    if (error)
        reject(error);

});
```

---

## Getting the Result

The Promise isn't the data.
It represents data that will be available later.
It's just the object tracking the operation.

To receive its result, we use **`.then()`**.

```js
promise.then((result) => {
    console.log(result);
});
```

If

```js
resolve("Hello");
```

was called,

then

```js
result
```

will contain

```text
"Hello"
```

---

## Handling Errors

If

```js
reject("Oops");
```

was called,

we use **`.catch()`**.

```js
promise.catch((error) => {
    console.log(error);
});
```

---

## Complete Example

```js
const promise = new Promise((resolve, reject) => {

    const success = true;

    if (success)
        resolve("Everything worked!");
    else
        reject("Something failed.");

});

promise
    .then((value) => {
        console.log(value);
    })
    .catch((error) => {
        console.log(error);
    });
```
---
# Key Takeaways

- A **Promise** is a placeholder for a value that will be available in the future.
- A Promise starts in the **Pending** state.
- Calling **`resolve(value)`** changes it to **Fulfilled** and provides the result.
- Calling **`reject(error)`** changes it to **Rejected** and provides the error.
- Use **`.then()`** to handle successful results.
- Use **`.catch()`** to handle failures.

### Remember

> **Promise = "I'm working on it. I'll either give you the result later or tell you why I couldn't."**

---

### Promise States

**State Transition:**
```
PENDING → FULFILLED (success)
   ↓
   → REJECTED (failure)
```

Once a Promise is fulfilled or rejected, its state **cannot change**.

<img src="../../More/Assests/Images/Promise_cycle.png" alt="Cycle" width="35%" higth="35%">

---

### Using Promises: .then() and .catch()

```typescript
function getUser(id) {
    return new Promise((resolve, reject) => {
        // fetch user...
        resolve(user);
    });
}

getUser(1)
    .then((user) => {
        return getPosts(user.id);
    })
    .then((posts) => {
        return getComments(posts[0].id);
    })
    .then((comments) => {
        return getLikes(comments[0].id);
    })
    .then((likes) => {
        console.log("Finally got everything!");
        console.log(likes);
    })
    .catch((error) => {
        console.log(error);
    });
```

**Key Benefit:** No more callback hell! Code flows top-to-bottom.

---

## 5️⃣ Async/Await

### What is Async/Await?

**Async/await** is syntactic sugar over Promises that makes async code **look and behave like synchronous code**.

**The Magic:**
- `async` keyword: Declares an async function
- `await` keyword: Pauses execution until Promise resolves
- Makes code easier to read and reason about

---

### Basic Async/Await Syntax

```typescript
// Traditional Promise
function fetchData(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data fetched!");
    }, 1000);
  });
}

function processDataWithPromises() {
  fetchData()
    .then(data => {
      console.log(data);
      return "Processed";
    })
    .then(result => {
      console.log(result);
    });
}

// Async/Await version
async function processDataWithAsync() {
  const data = await fetchData();
  console.log(data);
  const result = "Processed";
  console.log(result);
}
```

**Key Rules:**
1. `await` can only be used inside `async` functions
2. `async` functions always return a Promise
3. `await` pauses execution until Promise resolves

---

### Error Handling with Try/Catch

```typescript
// Promise .catch() style
function fetchUser(id: number): Promise<any> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: "Mohsen" });
      } else {
        reject(new Error("Invalid ID"));
      }
    }, 1000);
  });
}

function getUserPromise(id: number) {
  return fetchUser(id)
    .then(user => {
      console.log("User:", user);
      return user;
    })
    .catch(error => {
      console.error("Error:", error);
      throw error;
    });
}

// Async/await with try/catch
async function getUserAsync(id: number) {
  try {
    const user = await fetchUser(id);
    console.log("User:", user);
    return user;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw or handle
  }
}
```
---
Example:
```typescript
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function demo() {
  console.log("1. Inside async function");

  await delay(3000);

  console.log("4. Async function resumed after 3 seconds");
}

console.log("Start");

demo();

console.log("2. This runs immediately");

setTimeout(() => {
  console.log("3. Another callback runs while demo() is waiting");
}, 1000);

console.log("End");
```
---

### Comparing All Patterns: The Evolution

Let's solve the same problem using all three patterns:

**Problem:** Fetch user, then their posts, then comments.

#### Callback Hell Version
```typescript
getUser(123, (err, user) => {
  if (err) throw err;
  
  getPosts(user.id, (err, posts) => {
    if (err) throw err;
    
    getComments(posts[0].id, (err, comments) => {
      if (err) throw err;
      console.log(comments);
    });
  });
});
```

#### Promise Chain Version
```typescript
fetchUser(123)
  .then(user => fetchUserPosts(user.id))
  .then(posts => fetchPostComments(posts[0].id))
  .then(comments => console.log(comments))
  .catch(error => console.error(error));
```

#### Async/Await Version (Cleanest!)
```typescript
async function getUserComments() {
  try {
    const user = await fetchUser(123);
    const posts = await fetchUserPosts(user.id);
    const comments = await fetchPostComments(posts[0].id);
    console.log(comments);
  } catch (error) {
    console.error(error);
  }
}
```

**Winner:** Async/await! 🏆 Reads like synchronous code but executes asynchronously.

---

### Parallel Operations with Async/Await

```typescript
// ❌ Sequential (slow) - Each waits for previous
async function fetchAllDataSequential() {
  const users = await fetchUsers();      // Wait 1s
  const posts = await fetchPosts();      // Wait 1s
  const comments = await fetchComments(); // Wait 1s
  // Total: 3 seconds
  return { users, posts, comments };
}

// ✅ Parallel (fast) - All start at once
async function fetchAllDataParallel() {
  const [users, posts, comments] = await Promise.all([
    fetchUsers(),      // All start
    fetchPosts(),      // at the
    fetchComments(),   // same time!
  ]);
  // Total: 1.5 seconds (longest operation)
  return { users, posts, comments };
}
```

---

### When to Use Async/Await vs Promises

**Use Async/Await When:**
- ✅ Code needs to read sequentially
- ✅ You want cleaner error handling with try/catch
- ✅ Complex logic with multiple async operations
- ✅ You want code that looks synchronous

**Use Promise.then() When:**
- ✅ Simple one-off operations
- ✅ Chaining operations functionally
- ✅ Working with Promise utilities (Promise.all, etc.)
- ✅ You prefer functional style

**Real Talk:** Async/await is preferred in modern code, but knowing both is essential!

---

### Common Async/Await Mistakes

#### Mistake 1: Forgetting to Await
```typescript
// ❌ BAD: Returns Promise, not value
async function getData() {
  const data = fetchData(); // Missing await!
  console.log(data); // Promise { <pending> }
}

// ✅ GOOD
async function getData() {
  const data = await fetchData();
  console.log(data); // Actual data
}
```

#### Mistake 2: Sequential Instead of Parallel
```typescript
// ❌ SLOW: Sequential (3 seconds)
async function fetchAll() {
  const user = await fetchUser();    // 1s
  const posts = await fetchPosts();  // 1s
  const likes = await fetchLikes();  // 1s
}

// ✅ FAST: Parallel (1 second)
async function fetchAll() {
  const [user, posts, likes] = await Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchLikes(),
  ]);
}
```

#### Mistake 3: Not Handling Errors
```typescript
// ❌ BAD: Unhandled errors crash app
async function getData() {
  const data = await fetchData(); // What if this fails?
  return data;
}

// ✅ GOOD: Always handle errors
async function getData() {
  try {
    const data = await fetchData();
    return data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    return null; // Or throw, depending on needs
  }
}
```

---

## 6️⃣ Node.js Runtime Deep Dive

### What is Node.js?

**Simple Definition:**
Node.js is a JavaScript runtime that lets you run JavaScript **outside the browser**, on servers and computers.

**Technical Definition:**
```
Node.js = V8 Engine + libuv + Node APIs
```

**Components:**
1. **V8 Engine** - Google's JavaScript engine (compiles JS to machine code)
2. **libuv** - C library for async I/O, event loop, threading
3. **Node APIs** - Built-in modules (http, fs, path, etc.)

---

### Why Node.js is Special

**Traditional Server (PHP, Ruby):**
```
Request 1 → Server creates Thread 1 → Process → Response
Request 2 → Server creates Thread 2 → Process → Response
Request 3 → Server creates Thread 3 → Process → Response
```
- Each request = new thread
- Threads are expensive (memory, CPU)
- Limited scalability

**Node.js (Event-Driven):**
```
Request 1 → Event Loop → Queue → Process → Response
Request 2 → Event Loop → Queue → Process → Response
Request 3 → Event Loop → Queue → Process → Response
```
- Single thread handles all requests
- Non-blocking I/O
- Scales to thousands of requests

**Result:** Node.js can handle more requests with less resources! 🚀

---

### The Event Loop Explained

The **Event Loop** is the heart of Node.js - it's what makes async possible.

**How it Works:**

```
┌───────────────────────────┐
│       Call Stack          │ ← Your code runs here
└───────────────────────────┘
           ↓
┌───────────────────────────┐
│     Node APIs             │ ← setTimeout, fetch, etc.
└───────────────────────────┘
           ↓
┌───────────────────────────┐
│    Callback Queue         │ ← Callbacks wait here
└───────────────────────────┘
           ↓
┌───────────────────────────┐
│      Event Loop           │ ← Moves callbacks to stack
└───────────────────────────┘
```

**Example:**
```typescript
console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

console.log("3");

// Output: 1, 3, 2
// Why? Event loop processes setTimeout after current code
```

**Step by Step:**
1. `console.log("1")` → Executes immediately
2. `setTimeout(...)` → Sent to Node APIs, callback queued
3. `console.log("3")` → Executes immediately
4. Event Loop moves callback to stack
5. `console.log("2")` → Executes

---

### Event Loop Phases

The Event Loop has several phases it cycles through:

```
   ┌───────────────────────────┐
┌─>│           timers          │ ← setTimeout, setInterval
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │ ← I/O callbacks
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │ ← Internal use
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           poll            │ ← Retrieve new I/O events
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           check           │ ← setImmediate callbacks
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │ ← socket.on('close', ...)
   └───────────────────────────┘
```

**Simple Explanation:**
1. **Timers phase:** Execute setTimeout/setInterval callbacks
2. **Poll phase:** Retrieve new I/O events, execute I/O callbacks
3. **Check phase:** Execute setImmediate callbacks
4. **Close phase:** Execute close event callbacks

---

### Single-Threaded but Non-Blocking

**The Confusion:**
- "Node.js is single-threaded" ✅ TRUE (your JS runs on one thread)
- "Node.js can't do parallel work" ❌ FALSE! (libuv uses thread pool)

**How it Actually Works:**

```typescript
// Your code (single thread)
console.log("Start");

// Timer scheduled (sent to libuv)
setTimeout(() => {
  console.log("Timer complete!");
}, 1000);

// Your code continues (non-blocking!)
console.log("End");

// Output:
// Start
// End
// [1 second later...]
// Timer complete!
```

**Behind the Scenes:**
- Your JS runs on main thread
- Heavy operations (timers, network, crypto) → libuv thread pool
- When operation completes → callback added to event loop
- Main thread picks up and executes callback

**Result:** Single-threaded JS code, but parallel I/O operations! 🎯

---

### Microtasks vs Macrotasks

Not all async operations are equal! There are two queues:

**Microtasks (Higher Priority):**
- Promise callbacks (.then, .catch, .finally)
- process.nextTick (Node.js specific)
- queueMicrotask

**Macrotasks (Lower Priority):**
- setTimeout, setInterval
- setImmediate
- I/O operations

**Execution Order:**
1. Execute current code (call stack)
2. Execute ALL microtasks
3. Execute ONE macrotask
4. Execute ALL microtasks again
5. Repeat from step 3

---

### Example: Microtasks vs Macrotasks

```typescript
console.log("1: Start");

setTimeout(() => {
  console.log("2: setTimeout");
}, 0);

Promise.resolve().then(() => {
  console.log("3: Promise");
});

console.log("4: End");

// Output:
// 1: Start
// 4: End
// 3: Promise  ← Microtask (runs first!)
// 2: setTimeout  ← Macrotask (runs after)
```

**Why this order?**
1. Synchronous code runs first: "1: Start", "4: End"
2. ALL microtasks run: "3: Promise"
3. Then macrotasks: "2: setTimeout"

---

### Complex Example: Understanding the Order

```typescript
console.log("1");

setTimeout(() => {
  console.log("2");
  Promise.resolve().then(() => console.log("3"));
}, 0);

Promise.resolve().then(() => {
  console.log("4");
  setTimeout(() => console.log("5"), 0);
});

console.log("6");

// Output:
// 1
// 6
// 4
// 2
// 3
// 5
```

**Step-by-Step:**
1. `console.log("1")` - synchronous
2. `setTimeout` - scheduled as macrotask
3. `Promise.then` - scheduled as microtask
4. `console.log("6")` - synchronous
5. Microtask queue: `console.log("4")` executes
6. Inside microtask: `setTimeout` scheduled
7. Macrotask queue: `console.log("2")` executes
8. Inside macrotask: Promise scheduled as microtask
9. Microtask queue: `console.log("3")` executes
10. Macrotask queue: `console.log("5")` executes

---

### Global Objects in Node.js

Unlike browsers (where globals are `window`), Node.js has different globals:

```typescript
// global - Like window in browser
global.myVar = "Hello";
console.log(global.myVar); // "Hello"

// console - Same as browser
console.log("Message");
console.error("Error");
console.warn("Warning");

// __dirname - Current directory path (CommonJS)
// __filename - Current file path (CommonJS)
// Note: In ES modules, use import.meta.url

// process - Info about current Node.js process
console.log(process.version);    // Node version (e.g., v18.0.0)
console.log(process.platform);   // OS platform (e.g., 'linux', 'darwin', 'win32')
console.log(process.pid);        // Process ID
console.log(process.cwd());      // Current working directory
```

---

### The Process Object

The `process` object provides information and control over the current Node.js process.

```typescript
// Version information
console.log(process.version);        // v18.0.0
console.log(process.versions.node);  // Node version
console.log(process.versions.v8);    // V8 engine version

// Platform information
console.log(process.platform);  // 'linux', 'darwin', 'win32'
console.log(process.arch);      // 'x64', 'arm', 'arm64'

// Process ID
console.log(process.pid);  // Process ID number

// Current working directory
console.log(process.cwd());  // /home/user/project

// Environment variables
console.log(process.env.NODE_ENV);  // 'development' or 'production'
console.log(process.env.PORT);      // Port number from environment

// Memory usage
console.log(process.memoryUsage());
// {
//   rss: 24000000,       // Resident set size
//   heapTotal: 6000000,  // Total heap size
//   heapUsed: 4000000,   // Used heap size
//   external: 1000000    // External memory
// }

// Uptime (how long process has been running)
console.log(process.uptime()); // Seconds since process started
```

---

### Process Events

The process object is an EventEmitter and can listen to various events:

```typescript
// Exit event
process.on('exit', (code) => {
  console.log(`Process exiting with code: ${code}`);
  // Can only do synchronous operations here!
});

// Uncaught exception
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Log error, cleanup, then exit
  process.exit(1);
});

// Unhandled promise rejection
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Handle the error
});

// Interrupt signal (Ctrl+C)
process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully...');
  // Cleanup code here
  process.exit(0);
});
```

---

### Command Line Arguments

Access arguments passed to your Node.js script:

```typescript
// process.argv is an array of command line arguments
console.log(process.argv);

// Example: node app.js --port 3000 --env production
// Output:
// [
//   '/usr/bin/node',      // Node binary path
//   '/path/to/app.js',    // Script path
//   '--port',             // Argument 1
//   '3000',               // Argument 2
//   '--env',              // Argument 3
//   'production'          // Argument 4
// ]

// Simple argument parser
function parseArgs(): Record<string, string> {
  const args: Record<string, string> = {};
  
  for (let i = 2; i < process.argv.length; i += 2) {
    const key = process.argv[i].replace('--', '');
    const value = process.argv[i + 1];
    args[key] = value;
  }
  
  return args;
}

const args = parseArgs();
console.log(args);
// { port: '3000', env: 'production' }

const port = args.port || '8080';
const env = args.env || 'development';
console.log(`Running on port ${port} in ${env} mode`);
```

---

### Exit Codes

Process can exit with different codes to indicate status:

```typescript
// Exit codes
process.exit(0);  // Success
process.exit(1);  // General error
process.exit(2);  // Misuse of shell command

// Graceful shutdown example
async function shutdown() {
  console.log('Shutting down gracefully...');
  
  // Close database connections, etc.
  // await db.close();
  
  console.log('Cleanup complete');
  process.exit(0);
}

// Handle termination signals
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
```
---

## 📖 Additional Resources

### Documentation
- [MDN: Asynchronous JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous)
- [Node.js Event Loop Guide](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)
- [JavaScript.info: Promises](https://javascript.info/promise-basics)

### Visualizers
- [Loupe (Event Loop Visualizer)](http://latentflip.com/loupe/)
- [JavaScript Event Loop Visualization](https://www.jsv9000.app/)

---
