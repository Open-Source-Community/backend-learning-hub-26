# 🚇 Mona's Metro Control Room Goes Digital

> **The story:** You are Mona, newly promoted to shift lead at the Cairo Metro Line 3 control room. The old system is a guy named Am Reda shouting station updates into a walkie-talkie and hoping the right platform hears him. Yesterday two trains nearly matched schedules at Attaba because "the message didn't reach in time." Your manager just said one sentence: *"Mona, digitize this before rush hour eats us alive."* Your mission: understand how information actually travels between two points, then build the control room's first digital request desk — no Express, just Node.

---

## Tasks


### 1️⃣ Building the Control Desk (HTTP Server)

Time to replace Am Reda's shouting with an actual digital desk. Using Node's built-in `http` module — **no Express**:

- Create a server with 
- At `/`, respond with `"Welcome to Cairo Metro Control — Line 3"`
- For any other route, respond with a `404` and `"Platform not found"`

Start it on port `3000` and log a confirmation message once it's running.

---

### 2️⃣ Checking the Next Train (One More Route)

Add a second route:

- `/next-train` → responds with the current time as the "next train arrival" (reuse `new Date().toLocaleString()`)

This is Am Reda's one real job now: answering "when's the next train" without a walkie-talkie.

---

### 3️⃣ Logging Every Announcement (Stretch Goal)

Before responding to any request, log the request method and request url to the console — Mona wants a record of every inquiry that hits the control desk, the same way the metro logs every announcement made over the PA system.

---

## Expected Output Hints

| Task | Output |
|------|--------|
| Task 1 | `http://localhost:3000/` → welcome message. Anything else → 404 |
| Task 2 | `http://localhost:3000/next-train` → current date/time as a string |

---

*Run your server with `node server.js`  and test each route in the browser. Sabaah el kheir, Mona — el ma7atta beteen2ez.* 🚇