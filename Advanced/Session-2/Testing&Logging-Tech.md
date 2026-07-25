# Session-2 -Tech : Testing & Logging

# Testing Node.js Express using Jest and SuperTest
## 1. What is Jest?
- JavaScript testing framework.
- Used to write and run automated tests.
- Best for unit tests and test assertions.
## 2. What is SuperTest?
- HTTP testing library for Node.js.
- Sends real HTTP requests to Express/NestJS applications.
- Used for API integration and E2E testing.



## - Jest and SuperTest complement each other when testing backend APIs. Jest provides the testing framework—it runs the tests, organizes them, and verifies the expected results using assertions. SuperTest is responsible for sending HTTP requests (such as GET, POST, PUT, and DELETE) to the application and capturing the responses. Together, they allow developers to automatically test API endpoints and verify that the application behaves as expected, making backend testing fast, reliable, and repeatable.

## Getting Started:
```js
npm install --save-dev jest supertest
```
## server.js
```js
const app = require("./app");

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

## app.js
```js
const express = require("express");

const app = express();

app.use(express.json());

const users = [
  { id: 1, name: "Ahmed" },
  { id: 2, name: "Sara" }
];

// Home
app.get("/", (req, res) => {
  res.json({
    message: "API is running"
  });
});

// Get all users
app.get("/users", (req, res) => {
  res.status(200).json(users);
});

// Get user by ID
app.get("/users/:id", (req, res) => {
  const user = users.find(
    u => u.id === Number(req.params.id)
  );

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  res.json(user);
});

// Create user
app.post("/users", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      message: "Name is required"
    });
  }

  const user = {
    id: users.length + 1,
    name
  };

  users.push(user);

  res.status(201).json(user);
});

module.exports = app;
```

## app.test.js
```js
const request = require("supertest");
const app = require("../app");

describe("API Endpoint Tests", () => {

  describe("GET /", () => {

    it("should return API status", async () => {

      const res = await request(app).get("/");

      expect(res.status).toBe(200);

      expect(res.body.message)
        .toBe("API is running");
    });

  });

  describe("GET /users", () => {

    it("should return all users", async () => {

      const res = await request(app).get("/users");

      expect(res.status).toBe(200);

      expect(Array.isArray(res.body))
        .toBe(true);

      expect(res.body.length).toBeGreaterThan(0);
    });

  });

  describe("GET /users/:id", () => {

    it("should return one user", async () => {

      const res = await request(app).get("/users/1");

      expect(res.status).toBe(200);

      expect(res.body.name).toBe("Ahmed");
    });

    it("should return 404 if user does not exist", async () => {

      const res = await request(app).get("/users/100");

      expect(res.status).toBe(404);

      expect(res.body.message).toBe("User not found");
    });

  });

  describe("POST /users", () => {

    it("should create a new user", async () => {

      const res = await request(app)
        .post("/users")
        .send({
          name: "John"
        });

      expect(res.status).toBe(201);

      expect(res.body.name).toBe("John");
    });

    it("should reject empty request body", async () => {

      const res = await request(app)
        .post("/users")
        .send({});

      expect(res.status).toBe(400);

      expect(res.body.message).toBe("Name is required");
    });

  });

});
```


## Port Conflict Problem :
### - If app.listen(3000) runs inside your main application file, every test file that imports your app will try to bind to port 3000. This triggers EADDRINUSE (address already in use) errors.

### so Separating them allows your test runner to launch multiple test files in parallel without crashing over shared ports.

## How Does SuperTest Test APIs Calling app.listen()?
### - Instead of starting a real server, it imports the Express app, creates a temporary in-memory HTTP server (a lightweight web server that runs entirely in (RAM) memory ), and sends fake HTTP requests directly through Express's middleware, routes, and controllers.

### Since no real network port is opened, tests run faster, avoid "port already in use" errors, and still verify the API exactly as it behaves in production.


## Running the Tests
```js
npm test
```

# Logging in Node.js using Winston 
##### - Logging is a critical part of any application. 

##### - It helps with debugging, monitoring, and maintaining your code. Winston is one of the most popular logging libraries for Node.js due to its flexibility and feature-rich capabilities. 

##### - In this article, we will explore how to integrate Winston into your Node.js applications and make the most out of its features.


## Getting Started:
```js
npm install winston
```
 
## Logger.js

```js
const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "app.log" }),
  ],
});

module.exports = logger;
```


## app.js

```js
const express = require("express");
const logger = require("./logger");

const app = express();
app.use(express.json());

// array database
const users = [];

// Create User
app.post("/users", (req, res) => {
  const { name } = req.body;

  if (!name) {
    logger.warn("User creation failed: Name is missing");
    return res.status(400).json({ message: "Name is required" });
  }

  const user = {
    id: users.length + 1,
    name,
  };

  users.push(user);

  logger.info(`User created successfully (ID: ${user.id})`);

  res.status(201).json(user);
});

// Get All Users
app.get("/users", (req, res) => {
  logger.info("Fetching all users");

  res.json(users);
});

// Simulate an error
app.get("/error", (req, res) => {
  try {
    throw new Error("Database connection failed");
  } catch (err) {
    logger.error(err.message);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.listen(3000, () => {
  logger.info("Server started on port 3000");
});
```


## Output (Console):
```
info: Server started
info: User John logged in
error: Database connection failed
warn: Memory usage is high
```
