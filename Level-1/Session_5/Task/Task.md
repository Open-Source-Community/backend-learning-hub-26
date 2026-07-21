# 🚕 Am Ashraf's Microbus Fleet Finally Gets Organized

> **The story:** Am Ashraf runs three microbuses on the Mohandessin–Ramses line, and he's been keeping track of drivers, routes, and fares by shouting numbers at his nephew over the phone. Last Tuesday two drivers showed up for the same shift while a third route sat empty all morning, and Am Ashraf nearly lost his voice yelling about it. He's finally agreed to let you build him a system — not an app, "just something that doesn't make me scream, ya basha." Your mission: build him a real Express API to manage his fleet — no more double-booked shifts, no more empty routes.

---

## Tasks

### 1️⃣ Setting Up the Garage (Project Setup)

Set up a fresh Express + TypeScript project. At minimum you'll need `express`, `typescript`, `@types/node`, `@types/express`, and `ts-node` / `nodemon` for development. Create a `server.ts` that starts a server on port `3000` and logs a confirmation when it's running.

---

### 2️⃣ The Fleet Log (Data & Types)

Create a `Microbus` interface with: `id` (number), `driverName` (string), `route` (string), `farePerSeat` (number), `seatsAvailable` (number), and `ratings` (an array of objects mapping a passenger's name to a number, same idea as `{ Hossam: 5 }`).

Seed a `fleet` array with at least 4 microbuses Am Ashraf would actually run — Mohandessin–Ramses, Haram–Dokki, whatever routes feel right.

---

### 3️⃣ Checking the Garage (GET — Read)

Build `GET /fleet` that returns the full list, and `GET /fleet/:id` that returns a single microbus by ID.

- If the ID doesn't exist → respond `404` with a clear message ("Am Ashraf doesn't run that one")
- Both should respond `200` with the data on success

---

### 4️⃣ New Bus Joins the Line (POST — Create)

Build `POST /fleet` that adds a new microbus from the request body (`driverName`, `route`, `farePerSeat`, `seatsAvailable`).

- Assign the new microbus an `id` automatically
- If any required field is missing → respond `400`
- On success → respond `201` with the newly created microbus

---

### 5️⃣ Changing Driver or Fare (PUT — Update)

Build `PUT /fleet/:id` that updates an existing microbus. Only the fields provided in the body should change — everything else stays as it was.

- If the microbus doesn't exist → `404`
- On success → `200` with the updated microbus

---

### 6️⃣ Taken Off the Road (DELETE — Remove)

Build `DELETE /fleet/:id` that removes a microbus from the line entirely.

- If it doesn't exist → `404`
- On success → `200` with a confirmation message

---

### 7️⃣ "What's Under 10 Geneh a Seat?" (Query Params)

Build `GET /fleet/filter?maxFare=number` that returns every microbus with a `farePerSeat` less than or equal to `maxFare`.

- If `maxFare` is missing → `400`
- Read it from `req.query`, not the URL path

---

### 8️⃣ "What Did Hossam Rate the Dokki Bus?" (URL + Query Params Together)

Build `GET /fleet/rate/:id?rater=name` that returns the rating a specific passenger gave a specific microbus.

- Read the microbus `id` from `req.params`
- Read the `rater` name from `req.query`
- If either is missing → `400`
- If the microbus doesn't exist → `404`
- If that rater never rated it → respond clearly saying so (still `200`, just with a message)

---

### 9️⃣ Am Ashraf Doesn't Trust Empty Seats (Middleware — Bonus 🌟🌟)

Write a `validateMicrobus` middleware that runs before the `POST` and `PUT` handlers and checks that required fields are present and sensible (e.g. `farePerSeat` isn't negative). If validation fails, respond `400` and never reach the controller.

For extra credit, add a small logging middleware that prints the method and URL of every incoming request — Am Ashraf wants a record of who's been checking on his fleet.

---

### 🔟 Organizing the Garage (Project Structure)

Once everything works, split your single file into the recommended structure from the session: `controller/`, `router/`, `middleware/`, `data/`, and a slim `server.ts` that just wires them together. A messy garage is still a mess, even digitally.

---

## Expected Output Hints

| Task | Output |
|------|--------|
| Task 3 | `GET /fleet/1` → `200` with that microbus. `GET /fleet/999` → `404` |
| Task 4 | `POST /fleet` with missing `driverName` → `400`. Valid body → `201` with the new microbus |
| Task 5 | `PUT /fleet/1` with only `seatsAvailable` in the body → other fields unchanged |
| Task 6 | `DELETE /fleet/1` on a real ID → `200`. On a fake ID → `404` |
| Task 7 | `GET /fleet/filter?maxFare=10` → only microbuses at or under 10 EGP a seat |
| Task 8 | `GET /fleet/rate/1?rater=Hossam` → `{ id: 1, rater: "Hossam", rate: 5 }` (or similar) |

---

*Test everything in Postman before Am Ashraf tests it on a real passenger. Yalla, bel raha — one endpoint at a time.* 🚕