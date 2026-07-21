# TypeScript Session 2

## 📋 Table of Contents

1. [Recap](#1️⃣-recap)
2. [Problem with JavaScript](#2️⃣-problem-with-javascript)
3. [How the Problem is Solved](#3️⃣-how-the-problem-is-solved)
4. [What is TypeScript](#4️⃣-what-is-typescript)
5. [TypeScript Basics](#5️⃣-typescript-basics)
6. [Interfaces Deep Dive](#6️⃣-interfaces-deep-dive)
7. [Utility Types](#7️⃣-utility-types)
8. [Code Structure Philosophies](#8️⃣-code-structure-philosophies)
9. [Shape Compatibility](#9️⃣-shape-compatibility)

---

# 1️⃣ Recap

## Session Objectives

By the end of this session, you will be able to:

1. Understand why TypeScript exists and how it evolved
2. Learn the difference between static vs dynamic typing
3. Explore TypeScript's main features (types, inference, interfaces, generics)
4. Learn what transpilers do and how TSC works
5. Configure TypeScript using tsconfig.json
6. See how TypeScript fits into modern build workflows

## What We Covered Last Session

- What is Backend?
- Backend Engineer Mindset
- Languages & Tools Overview
- JavaScript Deep Dive
- Tour of our Resources

---

# 2️⃣ Problem with JavaScript

## Who Here Hates JS? 🤔

### The JavaScript Development Experience

- JavaScript is awesome for building things, but it can get chaotic
- Suddenly you're debugging for hours
- The bug? Something JS didn't warn you about until it exploded at runtime

### Common JavaScript Pain Points

```javascript
function calculateArea(length, width) {
  return length * width;
}

let area = calculateArea(2, 3); // Works fine: 6
area = calculateArea(2, "3"); // Output: "23" (string concatenation!)
```

**The Problem:** JavaScript silently converts types at runtime, leading to unexpected behavior.

---

# 3️⃣ How the Problem is Solved

## TypeScript Was the Answer

Microsoft introduced TypeScript as a solution:

- ✅ Code is safe and type annotated
- ✅ Bugs appear early at compile time
- ✅ Maintaining large projects became easier

### The Same Code in TypeScript

```typescript
function calculateArea(length: number, width: number): number {
  return length * width;
}

let area = calculateArea(2, 3); // Works fine: 6
area = calculateArea(2, "3"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'
```

**The Solution:** TypeScript catches type errors during development, before your code runs.

---

# 4️⃣ What is TypeScript

## TypeScript: JavaScript's Cousin

TypeScript is a **superset of JavaScript**, where it includes:
- **Static types** (errors caught during development)
- Can also be **dynamically typed** when needed
- TypeScript is **transpiled** (converted) into JavaScript code

## Why Transpilation?

### Quick Fact

When TypeScript was created, no browser or runtime could execute TypeScript directly.

TypeScript had two choices:

**Option A:**
- Create a new runtime or virtual machine that understands TypeScript
- ❌ Not practical - it would break compatibility with the entire JS ecosystem

**Option B:**
- Compile TypeScript into JavaScript, which browsers already understand
- ✅ TypeScript chose 100% compatibility with existing JavaScript engines

**Result:** TypeScript must be transpiled to JavaScript.

---

## Dynamic vs Static Typing

### Dynamic Typing
- Type checking happens at **runtime**, not during compilation
- Examples: Python, JavaScript
- More flexible, but errors appear late

### Static Typing
- Type checking happens during **writing code**
- Errors appear early on
- Examples: C++, Java, TypeScript
- More verbose, but safer

## 🎯 Quick Search Competition

**Question:** Why do we say "compilation time" even though JS is interpreted, and what is an LSP?

**Prize:** First one to answer correctly gets 5 mohsens! 🏆

---

# 5️⃣ TypeScript Basics

## 1. Basic Types

```typescript
// String type
let name: string = "Mohsen";

// Number type
let age: number = 28;

// Boolean type
let isCool: boolean = true;
```

### Custom Type Definitions

```typescript
// Define your own type
type Committee = "Backend" | "Linux" | "Frontend";

let myCommittee: Committee = "Backend"; // ✅ OK
let invalidCommittee: Committee = "Mobile"; // ❌ Error
```

---

## 2. The `any` Type - WD-40 of TypeScript

The `any` keyword is used when you don't expect a certain data type, like what JavaScript does.

```typescript
let age: any;
age = "hello world"; // ✅ OK
age = 32;            // ✅ OK
age = true;          // ✅ OK
age = { name: "Alice" }; // ✅ OK
```

**⚠️ Warning:** Using `any` defeats the purpose of TypeScript. Use it sparingly!

---

## 3. Union Types

Use the pipe operator `|` to declare that a variable may have 2 or more different data types.

```typescript
// Union of number and string
let age: number | string = "8";
age = 28; // ✅ OK
age = "twenty-eight"; // ✅ OK

// Union with type narrowing
function formatValue(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else {
    return value.toFixed(2);
  }
}
```

---

## 4. Functions

### Basic Function Syntax

```typescript
function functionName(parameters: parameterType): returnType {
  // Function body
}
```

### Example

```typescript
function greet(name: string): void {
  console.log(`Hello ${name}`);
}

function add(a: number, b: number): number {
  return a + b;
}
```

---

## 5. Arrow Functions - Two Ways

### Option 1: Type the Variable

```typescript
const sum: (x: number, y: number) => number = (x, y) => {
  return x + y;
};
```

**Meaning:**
- You are telling TypeScript: "The variable `sum` MUST be a function that takes two numbers and returns a number"
- You type the **variable** `sum`
- Before even writing the function body, TypeScript already knows the full function shape

**Why used?**
- When you want to strictly control the exact function type
- Useful for callbacks, interfaces, reusable function types

---

### Option 2: Type the Function

```typescript
const sum = (x: number, y: number): number => {
  return x + y;
};
```

**Meaning:**
- You only add types inside the function (parameter + return)
- TypeScript automatically figures out: "sum is a function that takes two numbers and returns a number"

**Why used?**
- Cleaner and shorter
- Type inference does most of the work
- Most commonly used approach

---

## 6. Arrays

### Basic Array Types

```typescript
// Inferred as any[]
let arr = [1, 2, 3, "hi", true];

// Explicit any[]
let ar: any[] = [1, 2, 3, "hi", true];

// Union type array
let array: (string | number)[] = [1, 2, 3, "hi"];

// String array
let names: string[] = ["yomna", "hi"];

// Number array
let nums: number[] = [1, 2, 3];
```

---

### Advanced Array Types

```typescript
// Tuple: fixed number of elements with fixed ordered types
let tuple: [string, number, boolean] = ["Yomna", 25, true];

// Readonly array: can't modify (push, pop, etc.)
let readonlyArr: readonly number[] = [1, 2, 3];

// Generic array syntax
let nums: Array<number> = [1, 2, 3];
let names: Array<string> = ["Yomna", "Ali"];
let mixed: Array<number | string> = [1, "hi"];
```

**Note:** Tuple is different from union:
- **Union:** Allows one type OR another in a single value
- **Tuple:** Fixed number of elements with fixed ordered types

---

## 7. Generic Types

Generics allow you to write reusable code that works with multiple data types.

```typescript
// Basic generic function
function identity<T>(value: T): T {
  return value;
}

let num = identity<number>(42);    // T is number
let str = identity<string>("hello"); // T is string
let auto = identity(true);          // T inferred as boolean
```

**Think of it as:** Generalizing what a function can do to multiple data types.

### Generic with Arrays

```typescript
function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

let firstNum = getFirstElement([1, 2, 3]);     // number | undefined
let firstStr = getFirstElement(["a", "b"]);    // string | undefined
```

---

# 6️⃣ Interfaces Deep Dive

## What are Interfaces?

Think of interfaces as **structs in C++** - they define the shape of objects.

```typescript
interface Member {
  name: string;
  age: number;
  committee: string;
}

const mem: Member = {
  name: "Mohsen",
  age: 28,
  committee: "BackEnd"
};

console.log(mem);
```

---

## What Happens After Compilation?

When TypeScript is compiled to JavaScript:

```javascript
// The interface disappears!
var mem = {
  name: "Mohsen",
  age: 28,
  committee: "BackEnd"
};
console.log(mem);
```

**Key Point:** There is no interface in JavaScript. TypeScript annotations (`: Member`) are removed after compilation.

---

## Discriminated Unions with Interfaces

Use interfaces with literal types to create discriminated unions:

```typescript
interface Circle {
  type: "circle";
  radius: number;
}

interface Square {
  type: "square";
  side: number;
}

type Shape = Circle | Square;

function area(s: Shape): number {
  if (s.type === "circle") {
    return Math.PI * s.radius ** 2;
  }
  return s.side * s.side;
}
```

**Benefit:** TypeScript knows which properties are available based on the `type` field.

---

## Optional Properties

Use `?` to make interface properties optional:

```typescript
interface User {
  id: number;
  name?: string;  // Optional property
  email: string;
}

const user1: User = {
  id: 1,
  email: "user@example.com"
  // name is optional, so this is valid
};
```

---

# 7️⃣ Utility Types

TypeScript provides built-in utility types to transform existing types.

## 1. Partial<Type>

Makes all properties of a type **optional**.

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// Without Partial - Error
const user2: User = {
  id: 2,
  name: "Ali"
}; // Error: Property 'email' is missing

// With Partial - OK
const partialUser: Partial<User> = {
  id: 3
}; // ✅ Works, name and email are optional
```

---

## 2. Required<Type>

Makes all properties of a type **required**.

```typescript
interface User {
  id: number;
  name: string;
  email?: string; // Optional
}

const user1: Required<User> = {
  id: 2,
  name: "yomna",
  email: "yomna@gmail.com" // Now required!
};
```

---

## 3. Readonly<Type>

Makes all properties of a type **read-only**.

```typescript
interface User {
  id: number;
  name: string;
  email?: string;
}

const user2: Readonly<User> = {
  id: 2,
  name: "yomna",
  email: "yomna@gmail.com"
};

user2.id = 3; // ❌ Error: Cannot assign to 'id' because it is a read-only property
```

---

## 4. Pick<Type, Keys>

**Select** specific properties from a type.

```typescript
interface User {
  id: number;
  name: string;
  email?: string;
}

const user3: Pick<User, "name" | "email"> = {
  id: 2, // ❌ Error: 'id' does not exist in type 'Pick<User, "name" | "email">'
  name: "yomna"
};
```

---

## 5. Omit<Type, Keys>

**Drop** specific properties from a type.

```typescript
interface User {
  id: number;
  name: string;
  email?: string;
}

const user4: Omit<User, "name"> = {
  id: 2,
  email: "yomna@gmail.com",
  name: "yomna" // ❌ Error: 'name' does not exist in type 'Omit<User, "name">'
};
```

---

# 8️⃣ Code Structure Philosophies

## Top-Down vs Bottom-Up Approaches

### Top-Down Approach

**Start big, then break down** - Write what you want first, then define details later.

```typescript
interface User {
  id: number;
  name: string;
  address: Address;
  roles: Role[];
}

interface Address {
  city: string;
  street: string;
}

type Role = "admin" | "member" | "guest";
```

---

### Bottom-Up Approach

**Start small, then build up** - Build all pieces first, then assemble.

```typescript
interface Id {
  id: number;
}

interface Named {
  name: string;
}

type Role = "admin" | "member" | "guest";

interface User extends Id, Named {
  roles: Role[];
}
```

---

## Comparison Table

| Bottom-Up | Top-Down |
|-----------|----------|
| Start small then build up | Start big then break down |
| Build all pieces then assemble | Write what you want first, then define how later |
| More modular and reusable | More intuitive and readable |
| Better for shared types | Better for complex objects |

**Choose based on your needs:** Neither approach is "better" - use what makes sense for your project!

---

# 9️⃣ Shape Compatibility

## Structural Typing in TypeScript

If we define multiple interfaces that have common attributes, we can assign an object of the **more general interface** to an object of the **narrower scope interface**.

### Example

```typescript
interface Person {
  name: string;
  age: number;
}

interface Employee {
  name: string;
  age: number;
  employeeId: number;
}

const person: Person = {
  name: "Bianka",
  age: 5
};

const employee: Employee = {
  name: "Bianka",
  age: 5,
  employeeId: 101
};
```

---

## Assignment Compatibility

```typescript
// ❌ Error: Employee can't be assigned to Person
// Person is missing 'employeeId'
const emp: Employee = person; // Error

// ✅ OK: Person can be assigned to Employee
// Employee has all Person properties (and more)
const per: Person = employee; // Works!
```

**Key Rule:** A type is compatible if it has **at least** the required properties.

---

## 🎯 Challenge: Make It Work in 4 Cases!

**Prize:** +4 mohsens! 🏆

Can you think of ways to make both assignments work? Consider:
- Type assertions
- Optional properties
- Intersection types
- Structural compatibility

---

# 🎓 Summary

## What We Learned Today

1. ✅ **Why TypeScript exists** - To catch errors early and make JavaScript safer
2. ✅ **Static vs Dynamic typing** - Compile-time vs runtime type checking
3. ✅ **TypeScript basics** - Types, unions, functions, arrays, generics
4. ✅ **Interfaces** - Defining object shapes and contracts
5. ✅ **Utility types** - Partial, Required, Readonly, Pick, Omit
6. ✅ **Code structure** - Top-down vs bottom-up approaches
7. ✅ **Shape compatibility** - Structural typing rules

---

## 🎯 Next Steps

- **Practice** writing TypeScript code
- **Experiment** with different type constructs
- **Configure** your own tsconfig.json
- **Explore** how TypeScript fits into build workflows

---

## 🔥 Key Takeaways

1. **TypeScript = JavaScript + Types** - It's a superset that compiles to JS
2. **Catch errors early** - Type checking happens during development
3. **Interfaces disappear** - They're only for compile-time checking
4. **Structural typing** - Compatibility is based on shape, not names
5. **Use utility types** - Transform types easily with built-in utilities

---

**Remember:** TypeScript is about making your code more maintainable and catching bugs before they reach production! 🚀