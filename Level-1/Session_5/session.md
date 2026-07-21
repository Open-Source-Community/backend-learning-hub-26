# Session 5: Building a Server with Express

## 📋 Session Agenda

**Part 1: Recap**

1. What is the backend, really
2. Node.js vs. Express vs. JS vs. TS — who does what
3. Client-server connection, HTTP, HTTP methods
4. What is an API, and what is REST

**Part 2: How the Client Sends Data**

1. URL params
2. Query params
3. Request body
4. Hands-On 1: build a GET endpoint that greets a client by name

**Part 3: CRUD Operations**

1. Create, Read, Update, Delete — mapped to HTTP methods
2. Standard status codes for each operation

**Part 4: Project Structure**

1. Why structure matters as your API grows
2. The recommended folder layout: controller, router, middleware, data
3. Hands-On 2: restructure Hands-On 1 into that layout

---

## 🎯 Session Objectives

By the end of this session, you will be able to:

1. Explain what Express adds on top of plain Node.js
2. Read data sent by a client through URL params, query params, and the request body
3. Map CRUD operations to their corresponding HTTP methods
4. Return correct, standard status codes for each kind of response
5. Organize an Express project into controllers, routes, and middleware instead of one giant file

---

# Part 1: Recap

## 1️⃣ What Is the Backend?

The backend is the brain of the application — it handles data, logic, and security, and it's the only part that's allowed to talk directly to the database. The client (browser, mobile app) never touches the database itself; it always goes through the backend.

**Backend responsibilities:**
- Authentication (login/signup)
- Storing and retrieving data
- Business logic
- Security and validation

---

## 2️⃣ Node.js vs. Express vs. JS vs. TS

| | What it is |
|---|---|
| **Node.js** | A runtime environment — runs JavaScript outside the browser, on a server. Fast, event-driven. |
| **Express** | A framework built on top of Node.js — simplifies server creation, handles routing and requests for you. |
| **JavaScript** | The language itself. |
| **TypeScript** | A layer on top of JavaScript that adds types — same language at runtime, safer while you write it. |

Everything you built in Session 4 with the raw `http` module, Express does too — just with a lot less boilerplate. That's the whole pitch of a framework.

---

## 3️⃣ Client-Server Connection, HTTP, HTTP Methods

Same model from Session 4, just a reminder:

```
Client  → Request  → Server
Server  → Response → Client
```

**HTTP** is the communication protocol they speak: request/response, stateless — every request stands on its own, with no memory of the last one.

**HTTP Methods:**

| Method | Meaning |
|---|---|
| GET | Read |
| POST | Create |
| PUT | Update |
| DELETE | Remove |

---

## 4️⃣ What Is an API? What Is REST?

An **API** (Application Programming Interface) is the contract between client and server — it defines the endpoints, and what goes in and comes out of each one.

There's more than one style of API:

- **REST** (most common — what we're using)
- GraphQL
- SOAP
- gRPC

**REST is a design style**, not a library or a rule enforced by code — it's a set of conventions your endpoints agree to follow:

- **Resources, not actions** — `/users`, not `/getUsers`
- **HTTP methods carry the verb** — `GET /users` reads, `POST /users` creates
- **Clear URLs** — `/users`, `/users/5`
- **Stateless** — each request is independent, no session memory between them
- **Standard responses** — status codes like `200`, `201`, `404`, `500`, usually with a JSON body

```
CLIENT                HTTP + URL                SERVER
┌────────┐   GET /surveys/123      ┌──────────┐
│Browser │ ───────────────────────▶│  Server  │
└────────┘                          └──────────┘
     ▲                                    │
     │        JSON response               │
     └────────────────────────────────────┘
     { "survey_id": 123, "score": 9, ... }
```

---

# Part 2: How the Client Sends Data

There are three ways a client can hand data to your server. Picking the right one for the job is half of API design.

## 5️⃣ URL Params

Part of the path itself — used for identifying *which* resource you mean.

```typescript
// http://localhost:3000/hello/Omnia
app.get('/hello/:name', (req: Request, res: Response) => {
  const name = req.params.name; // "Omnia"
  res.send(`Hello, ${name}!`);
});
```

Use this when the value is required to even know what resource you're talking about — like an ID.

## 6️⃣ Query Params

Key-value pairs tacked onto the end of the URL after a `?` — used for optional filters, options, or extra detail.

```typescript
// http://localhost:3000/hello?name=Omnia
app.get('/hello', (req: Request, res: Response) => {
  const name = req.query.name; // "Omnia"
  res.send(`Hello, ${name}!`);
});
```

Use this for things that are optional or used for filtering — like `?minPrice=50`.

## 7️⃣ Request Body

Data sent in the body of the request — used for anything bigger than a single value, typically on `POST`/`PUT`.

```typescript
// POST http://localhost:3000/sum
// body: { "num1": 1, "num2": 2 }
app.post('/sum', (req: Request, res: Response) => {
  const a: number = Number(req.body.num1);
  const b: number = Number(req.body.num2);
  res.send(`The sum is ${a + b}`);
});
```

You need `app.use(express.json())` registered once, near the top of your server file, or `req.body` will be `undefined`.

---

# Part 3: CRUD Operations

**CRUD** is the four things almost every resource-based API needs to do, and each one maps cleanly onto an HTTP method:

| CRUD | HTTP Method | Example |
|---|---|---|
| **C**reate | `POST` | `POST /products` |
| **R**ead | `GET` | `GET /products` or `GET /products/:id` |
| **U**pdate | `PUT` | `PUT /products/:id` |
| **D**elete | `DELETE` | `DELETE /products/:id` |

## 9️⃣ Standard Status Codes

| Code | Meaning | Used for |
|---|---|---|
| `200` | OK | Successful GET, PUT, DELETE |
| `201` | Created | Successful POST |
| `400` | Bad Request | Missing/invalid input from the client |
| `404` | Not Found | Resource with that ID doesn't exist |
| `500` | Server Error | Something broke on your end |

A CRUD endpoint that always returns `200` regardless of what happened is doing its job halfway — the status code is part of the response, not an afterthought.

---

# Part 4: Project Structure

## 🔟 Why Structure Matters

One giant `server.ts` file with every route and every bit of logic works fine for a demo — and falls apart fast in a real project. Structure buys you:

- **Maintainability** — you know where to look for anything
- **Scalability** — adding a new resource doesn't mean scrolling through 500 lines
- **Collaboration** — two people can work on different files without stepping on each other
- **Debugging & testing** — logic is isolated, so bugs are easier to trace

## 1️⃣1️⃣ The Recommended Layout

```
project-root/
├── controller/         # Business logic — what actually happens
│   └── product.controller.ts
├── router/              # Route definitions — which URL maps to which controller
│   └── product.router.ts
├── middleware/          # Validation, logging, auth — runs before the controller
│   └── product.middleware.ts
├── data/                # In-memory or mock data (until you add a real database)
│   └── ProductData.ts
├── server.ts             # Entry point — wires everything together
├── package.json
└── README.md
```

**How a request flows through it:**

```
Request → router → middleware (optional) → controller → response
```

```typescript
// server.ts
import express from 'express';
import productRouter from './router/product.router';

const app = express();
app.use(express.json());
app.use('/products', productRouter);

app.listen(3000, () => console.log('Server running'));
```

```typescript
// router/product.router.ts
import { Router } from 'express';
import { getAllProducts, addProduct } from '../controller/product.controller';

const router = Router();
router.get('/', getAllProducts);
router.post('/', addProduct);

export default router;
```

```typescript
// controller/product.controller.ts
import { Request, Response } from 'express';
import { products } from '../data/ProductData';

export const getAllProducts = (req: Request, res: Response) => {
  res.status(200).send({ status: 200, data: products });
};
```

Each file has exactly one job. That's the whole idea.

---

# 🎓 Summary

## Key Takeaways

1. **Express is Node.js with the boilerplate removed** — same underlying model, less code to write.
2. **REST is a convention, not a rule the code enforces** — resources in the URL, verbs in the HTTP method.
3. **Three ways a client sends data**: URL params (identity), query params (optional filters), request body (bigger payloads).
4. **CRUD maps directly to HTTP methods** — and each response should carry the status code that actually matches what happened.
5. **Structure isn't decoration** — controller/router/middleware/data separation is what keeps a growing project sane.

---


