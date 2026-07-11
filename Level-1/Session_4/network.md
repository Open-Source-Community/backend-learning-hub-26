# Session 4: Networking Basics + Your First Node.js Server

## 📋 Session Agenda

**Part 1: How Networks Actually Work**

1. What is a network? The client-server model
2. IP addresses — how machines find each other
3. Ports — how one machine handles many services
4. DNS — turning names into addresses
5. TCP vs UDP — the two ways data travels
6. Where HTTP fits on top of all this

**Part 2: The HTTP Protocol**

1. Request/response cycle, end to end
2. Anatomy of a request (method, path, headers, body)
3. Anatomy of a response (status line, headers, body)
4. The HTTP methods you'll actually use (GET, POST, PUT, DELETE)
5. Status codes, grouped by what they mean

**Part 3: Building a Server with Node's `http` Module**

1. `http.createServer()` — what it does, no framework involved
2. The `req` and `res` objects
3. Sending a response: `writeHead` / `end`
4. Adding ONE simple route
5. Handling "route not found"

**Part 4: Hands-On**

1. Build the server from scratch, live
2. Test it with the browser and curl/Postman
3. Stretch goal: add a second route

---

## 🎯 Session Objectives

By the end of this session, you will be able to:

1. Explain what a network is and how a client and server actually talk to each other
2. Explain what an IP address and a port are, and why you need both
3. Explain what DNS does and why `localhost:3000` still works without it
4. Explain the difference between TCP and UDP, at a high level
5. Explain the HTTP request/response cycle
6. Build a working HTTP server using **only** Node.js — no Express
7. Handle one simple route and return a response

**What's explicitly out of scope this session:** REST conventions, full CRUD, input validation, multiple resources. That's Session 5 (Express). Session 4 is about understanding the plumbing underneath.

---

## 🎯 Why This Session Matters

Most people learn Express before they understand what a "server" even is. That means `app.listen(3000)` feels like magic. This session removes the magic:

- ❓ What actually happens between typing a URL and seeing a page?
- ❓ What is your computer *doing* when it "connects" to a server?
- ❓ Why does a server need a port, not just an address?
- ❓ What is Node's `http` module actually giving you?

**The goal:** once you've built a server with zero dependencies, Express will look like a shortcut — not a black box.

---

# Part 1: How Networks Actually Work

## 1️⃣ What Is a Network? The Client-Server Model

A network is just two or more computers that can send data to each other. For almost everything we build, that means two roles:

- **Client** — the one who asks (your browser, your phone app, Postman)
- **Server** — the one who answers (your Node.js process)

```
Client                          Server
  |  ---- "Can I get /users?" ---->  |
  |                                   |
  |  <---- "Here's the data" ------  |
```

The server is just a program that's always running, listening for someone to talk to it. That's it — no magic. `server.listen(3000)` literally means "sit here and wait for someone to connect."

---

## 2️⃣ IP Addresses — How Machines Find Each Other

Every device on a network has an **IP address** — a unique number that identifies it, the same way a phone number identifies a phone.

```
192.168.1.100        ← A typical local IP address (IPv4)
127.0.0.1             ← "localhost" — your own machine
```

- `127.0.0.1` (or `localhost`) always means "this computer, right now"
- Public websites have public IP addresses, but you almost never type them — you type a domain name instead (more on that below)

**Try it yourself:**
```bash
ping google.com
```
This resolves `google.com` to an IP address and sends it a tiny packet, just to see if it answers.

---

## 3️⃣ Ports — How One Machine Runs Many Services

An IP address gets you to the right *machine*. A **port** gets you to the right *program* on that machine.

Think of the IP address as a building's street address, and the port as the specific apartment number.

```
192.168.1.100:3000
     ↑           ↑
  which house   which apartment
```

A single machine can run a database on port `5432`, a web server on port `3000`, and another app on port `8080` — all at the same time, all reachable independently.

```
:80    → default HTTP port (browsers assume this if you don't specify one)
:443   → default HTTPS port
:3000  → common Node.js dev port
:5432  → common PostgreSQL port
```

That's why `server.listen(3000)` needs a number — it's telling the OS "any traffic that shows up on port 3000, hand it to me."

---

## 4️⃣ DNS — Turning Names Into Addresses

Nobody wants to memorize `142.250.190.14` to visit Google. **DNS (Domain Name System)** is the phonebook of the internet — it translates human-friendly names into IP addresses.

```
1. You type:        google.com
2. Your computer asks a DNS server:  "What's the IP for google.com?"
3. DNS server replies:               "142.250.190.14"
4. Your browser connects to:         142.250.190.14
```

This is why `localhost:3000` works without any DNS lookup — `localhost` is a special name your machine already knows points to `127.0.0.1`. No phonebook needed, you're calling yourself.

---

## 5️⃣ TCP vs UDP — The Two Ways Data Travels

Once your computer knows the IP and port, it still needs a way to actually move the data. There are two common options:

| | TCP | UDP |
|---|---|---|
| **Guarantees delivery?** | ✅ Yes — resends lost data | ❌ No — fire and forget |
| **Keeps order?** | ✅ Yes | ❌ No |
| **Speed** | Slower (more overhead) | Faster (less overhead) |
| **Used for** | Web pages, APIs, file transfer | Video calls, live streaming, gaming |

**HTTP runs on top of TCP.** That's why when you build a Node.js HTTP server, you never have to think about lost or out-of-order packets — TCP already solved that for you underneath.

---

## 6️⃣ Where HTTP Fits

Put it all together, and visiting `http://api.example.com/users/123` looks like this:

```
1. Browser  →  DNS
   "What's the IP for api.example.com?"

2. DNS      →  Browser
   "It's 192.168.1.100"

3. Browser  →  Server (192.168.1.100), over TCP, on port 80
   GET /users/123 HTTP/1.1
   Host: api.example.com

4. Server   →  Browser
   HTTP/1.1 200 OK
   Content-Type: application/json

   {"id": 123, "name": "Mohsen"}
```

Every layer we just covered (client/server, IP, port, DNS, TCP) had to happen *before* HTTP even starts. HTTP is just the language client and server agree to speak once they're connected.

---

# Part 2: The HTTP Protocol

## 7️⃣ The HTTP Request, Piece by Piece

```
GET /users/123?active=true HTTP/1.1        ← Request line (method + path + version)
Host: api.example.com                       ← Headers
Content-Type: application/json
                                            ← Blank line
{"data": "only present on POST/PUT"}        ← Body (optional)
```

## 8️⃣ The HTTP Response, Piece by Piece

```
HTTP/1.1 200 OK                             ← Status line
Content-Type: application/json              ← Headers
Content-Length: 45
                                            ← Blank line
{"id": 123, "name": "Mohsen"}              ← Body
```

## 9️⃣ HTTP Methods You'll Actually Use

| Method | Purpose | Has body? |
|---|---|---|
| **GET** | Read data | No |
| **POST** | Create data | Yes |
| **PUT** | Replace data | Yes |
| **DELETE** | Remove data | Usually no |

## 🔟 Status Codes, Grouped

```
2xx - Success        (200 OK, 201 Created)
3xx - Redirection     (301 Moved, 304 Not Modified)
4xx - Client error    (400 Bad Request, 404 Not Found)
5xx - Server error    (500 Internal Server Error)
```

You don't need to memorize every code today — just recognize the *category* by the first digit.

---

# Part 3: Building a Server with Node's `http` Module

## 1️⃣1️⃣ Your First HTTP Server

```typescript
import http from "http";

const server = http.createServer((req, res) => {
  // This function runs for EVERY incoming request
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello, World!");
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
```

**What's happening, line by line:**

1. `http.createServer()` creates a server and takes a callback that runs on every request
2. `req` = information about the incoming request (method, url, headers)
3. `res` = the object you use to send something back
4. `res.writeHead(200, {...})` sets the status code and headers
5. `res.end(...)` sends the body and finishes the response
6. `server.listen(3000)` tells the OS "give me anything that arrives on port 3000"

---

## 1️⃣2️⃣ Looking Inside `req`

```typescript
const server = http.createServer((req, res) => {
  console.log("Method:", req.method); // "GET"
  console.log("URL:", req.url);       // "/" or "/time"

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello!");
});
```

---

## 1️⃣3️⃣ Adding ONE Simple Route

This is the whole point of today: no router library, no magic — just an `if` statement checking the URL.

```typescript
import http from "http";

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to the home page!");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 - Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

That `if/else` **is** routing. Express just gives you a nicer syntax for the exact same idea — you'll appreciate that next session.

---

# 🎓 Summary

## Key Takeaways

1. **A network is just client + server talking.** Nothing more mystical than that.
2. **IP address = which machine. Port = which program on that machine.**
3. **DNS is the phonebook** that turns names into IP addresses.
4. **TCP guarantees delivery and order; HTTP is built on top of TCP.**
5. **An HTTP server, stripped down, is just a callback function** that reads `req` and writes to `res`.
6. **Routing is pattern matching** — `if (req.url === "/something")`.

---

## 🎯 Next Session Preview

**Session 5: Express.js**

Now that you've built routing by hand, you'll see exactly what Express automates: cleaner routing, middleware, and built-in helpers for JSON, so you can build APIs faster without losing the mental model you built today.

---

## 📚 Additional Resources

- [Node.js HTTP Module](https://nodejs.org/api/http.html)
- [MDN: HTTP Overview](https://developer.mozilla.org/en-US/docs/Web/HTTP)
- [MDN: How the Web Works](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works)

---

## ✅ Session Checklist

Before moving to the next session, make sure you can:

```
□ Explain the client-server model in your own words
□ Explain the difference between an IP address and a port
□ Explain what DNS does
□ Explain the difference between TCP and UDP at a high level
□ Explain the HTTP request/response cycle
□ Create a basic HTTP server with Node.js (no Express)
□ Add one working route and a 404 fallback
```

**If you can do all of these, you're ready for Express.js!** 🎓