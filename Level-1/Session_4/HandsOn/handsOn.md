## 📝 Practice Tasks

> Goal: build a plain Node.js HTTP server — **no Express** — with one working route. Nothing here should need a package outside Node's built-in `http` module.

### Task 1: Hello Server

Build a server that:

- Responds `"Hello, World!"` at `/`
- Returns a `404` for any other route

This is the whole point of the session — get comfortable with `http.createServer`, `req.url`, and `res.end` before adding anything else.

---

### Task 2: One More Route

Extend your Task 1 server with a second route:

- `/time` → responds with the current server time as plain text

Keep using plain `if / else if` — this is manual routing on purpose, so you can feel what Express automates next session.

---

### Stretch Goal (optional): Read the Request

Log the incoming method and URL to your terminal for every request, before you respond:

```typescript
console.log(req.method, req.url);
```

Then visit a few different paths in your browser and watch your terminal — this is the fastest way to *see* the request/response cycle happening in real time.

---

### ✅ Done When

- `node server.ts` (or your build/run command) starts without errors
- Visiting `http://localhost:3000/` shows your hello message
- Visiting `http://localhost:3000/time` shows the current time
- Visiting anything else shows a 404