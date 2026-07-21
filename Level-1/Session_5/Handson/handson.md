## 📝 Practice Tasks

### Hands-On 1: The Welcome Desk

Build a new `GET` endpoint with Express that:

- Accepts a `name` sent from the client
- Responds with a welcome message that includes that name

Test it in Postman or your browser, and try a few different names to make sure it works correctly no matter who sends it.

---

### Hands-On 2: Tidying Up

Take the exact server you just built in Hands-On 1 — same behavior, nothing new — and reorganize it into the recommended project structure from the session:

```
project-root/
├── controller/
├── router/
├── server.ts
```

- `server.ts` should only set up Express, apply `express.json()`, mount the router, and start listening
- The route definition (`GET /welcome`) belongs in `router/`
- The actual logic (reading the name, building the message) belongs in `controller/`

Nothing about how it behaves should change — someone testing your endpoint shouldn't be able to tell you moved anything.

---

### ✅ Done When

- `GET /welcome?name=YourName` returns a message that includes `YourName`
- Trying a different name in the query string changes the response accordingly
- After Hands-On 2, the same endpoint still works, but the logic lives in a controller file and the route lives in a router file — not all three in `server.ts`