# Architectural Patterns & System Design

## [Session Slides](https://docs.google.com/presentation/d/1Fk9CbIse8Z32luuN30bh3TbSD37y31BzV4svJfWqAhg/edit?usp=sharing)

## 📋 Session Agenda

**Part 1: Why Architecture Exists**

1. What is software architecture
2. Software architecture vs. system architecture
3. What happens without architecture

**Part 2: Core Architectural Patterns**

1. Layered / N-Tier Architecture
2. Hexagonal Architecture (Ports & Adapters)
3. Monolith vs. Modular Monolith vs. Microservices
4. Event-Driven Architecture
5. CQRS (Command Query Responsibility Segregation)

**Part 3: System Design Fundamentals**

1. Functional vs. non-functional requirements
2. The four questions every system designer asks: scalability, availability, performance, consistency
3. The toolbox: horizontal/vertical scaling, load balancers, redundancy, failover, replication, caching, consistency models

**Part 4: Activity**

1. Design Facebook, together
2. Your turn: design Discord

---

## 🎯 Session Objectives

By the end of this session, you will be able to:

1. Explain the difference between software architecture and system architecture
2. Explain what problem each core architectural pattern solves — not just define it
3. Choose between Monolith, Modular Monolith, and Microservices for a given team size and growth stage
4. Explain the four pillars of system design: scalability, availability, performance, consistency
5. Explain what a load balancer, cache, and replication each actually do, and why
6. Walk through designing a real system (Discord) and justify your architectural choices

---

# Part 1: Why Architecture Exists

## 1️⃣ What Is Software Architecture?

**Software architecture is how we organize our code.**

Some of the questions it answers:

- Where does business logic live?
- Where does database logic live?
- Which modules should exist?
- How do modules communicate?

> **Architecture is the set of decisions that are expensive to change later.** Everything else is just a decision.

---

## 2️⃣ Software Architecture vs. System Architecture

They overlap, but they aren't the same thing.

| | Covers |
|---|---|
| **Software architecture** | The internal structure of a single application — modules, layers, APIs, runtime behavior |
| **System architecture** | The whole system — software, hardware, network, data storage, external services, and the humans in the loop |

**Example: Online Shopping Website**

- **Software architecture**: organizing the application into User, Product, Order, and Payment modules, and choosing a Layered Architecture or Microservices
- **System architecture**: deciding to deploy on multiple servers, use a load balancer, PostgreSQL, Redis, and connect to an external payment gateway

---

## 3️⃣ Without Architecture

A system can still work at first. As it grows, expect:

- **Poor maintainability** — code becomes hard to understand, modify, and debug
- **Limited scalability** — struggles under more users or traffic
- **Low performance** — slow responses, wasted resources
- **High coupling** — components become tightly dependent, so every change is risky
- **Reduced reliability** — one component failing takes the whole system down
- **Security weaknesses** — bolted on after the fact instead of designed in
- **Higher development costs** — new features take longer, break more
- **Expensive redesigns** — early mistakes get harder and costlier to reverse

---

# Part 2: Core Architectural Patterns

**Architectural patterns are reusable, high-level solutions for organizing a software system.** They define how major components are structured and how they communicate. Each one below exists to solve a specific, recurring problem — that's the lens to view all of them through.

---

## 4️⃣ Problem #1: Everything Is in One File

### Layered Architecture

**Definition:** organizes an application into layers, where each layer has one responsibility and only talks to the layers next to it.

```
Client
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Database
```

| | |
|---|---|
| **Used when** | CRUD applications, enterprise systems, small-to-medium projects |
| **Pros** | Easy to understand, clear separation of concerns, easy to maintain, widely supported |
| **Cons** | Can become tightly coupled, business logic may leak into other layers, not ideal for highly scalable systems |

**Tradeoff profile:** Low agility · Low ease of deployment · High testability · Low performance · Low scalability · High ease of development

---

## 5️⃣ Problem #2: Swapping Payment Providers

*"We are replacing Stripe with Paymob. Should we edit business logic?"*

### Hexagonal Architecture (Ports & Adapters)

**Definition:** places business logic at the center, isolating external systems (database, APIs, UI) behind interfaces ("ports") and the adapters that implement them.

```
Business Logic
     ↓
Interface (Port)
     ↓
Stripe Adapter
```

**Business logic never changes. Technology changes.**

| | |
|---|---|
| **Used when** | Complex business logic, testability matters, underlying technologies may change |
| **Pros** | Highly testable, loose coupling, easy to swap external systems, business logic independent of frameworks |
| **Cons** | More abstraction, extra code, overkill for simple CRUD apps |

**Tradeoff profile:** High agility · Medium ease of deployment · Very high testability · Medium performance · Medium scalability · Low ease of development

---

## 6️⃣ Problem #3: The Company Grows to 100 Developers

*"Should everyone edit one project?"*

### Monolith

**What it is:** a single application containing all the features, deployed as one unit — one application, one deployment, one server.

| | |
|---|---|
| **Used when** | MVPs, startups, small teams, university projects, most CRUD applications |
| **Pros** | Simple, easy debugging, easy deployment, easy local development, perfect for startups |
| **Cons** | Large codebase, everyone works on the same project, deploying one feature deploys everything, harder to scale teams |

> **Thought experiment:** if Facebook started today with 3 developers, would you choose Microservices? Five years later — 3 developers become 120, everyone edits the same project, merge conflicts pile up, deployments slow down, and nobody's sure who owns what. Can we stay one application, but organize it better?

### Modular Monolith

**What it is:** one deployment, one application, but multiple independent modules inside it.

| | |
|---|---|
| **Pros** | One deployment, clear ownership, easy onboarding, easier future migration, great for growing startups |
| **Cons** | Usually one database, deployments still get large eventually |

**Why this matters:** if you later want microservices, you don't rewrite everything — you *extract* a module. A Notification Module becomes a Notification Service. That's why a Modular Monolith is often called a stepping stone to Microservices.

| | Monolith | Modular Monolith |
|---|---|---|
| Deployments | One | One |
| Code organization | Loose | Strict modules |
| Team ownership | Difficult | Easier |
| Easy to start | ✅ | ✅ |
| Easy to grow | ❌ | ✅ |
| Microservice-ready | ❌ | ✅ |

### Microservices

**Definition:** breaks an application into small, independent services, each responsible for one business capability (User Service, Order Service, Payment Service, Inventory Service...), communicating over the network.

| | |
|---|---|
| **Used when** | Large applications, multiple development teams, independent deployment is required |
| **Pros** | Independent deployment, independent scaling, fault isolation, technology flexibility per service |
| **Cons** | Complex inter-service communication, distributed debugging, higher infrastructure cost, data consistency challenges |

**Tradeoff profile:** High agility · High ease of deployment · High testability · Low performance · High scalability · High ease of development

---

## 7️⃣ Problem #4: One Action, Many Side Effects

*"Order created → needs to notify Email, Analytics, Notification, Inventory. Should the Order Service call all of them directly?"*

### Event-Driven Architecture

**Definition:** components communicate by publishing and consuming events through a message broker, instead of calling each other directly.

| | |
|---|---|
| **Used when** | Notifications, real-time systems, asynchronous processing |
| **Pros** | Loose coupling, highly scalable, easy to add new consumers, handles traffic spikes well |
| **Cons** | Hard to debug ("where did this event go?"), event ordering issues, eventual consistency, duplicate event handling |

**Tradeoff profile:** High agility · High ease of deployment · Low testability · High performance · High scalability · Low ease of development

---

## 8️⃣ Problem #5: Millions of Reads, Thousands of Writes

*Instagram has millions of reads and thousands of writes. Should the database treat both the same? No.*

### CQRS (Command Query Responsibility Segregation)

**Definition:** separates read operations (queries) from write operations (commands), often with entirely separate read and write models.

| | |
|---|---|
| **Used when** | Read-heavy systems, dashboards, analytics |
| **Pros** | Better read performance, independent scaling of reads vs. writes, optimized models for each |
| **Cons** | More complexity, requires syncing data between models, usually paired with Event Sourcing to be worth the overhead |

---

## 9️⃣ Putting It All Together

Each pattern operates at a different level of abstraction — some are about organizing code *inside* an app, others are about organizing communication *between* apps.

| Pattern | Solves |
|---|---|
| Layered | Mixed responsibilities |
| Hexagonal | Business logic depending on technology |
| Monolith | Small/simple systems |
| Modular Monolith | Growing codebase |
| Microservices | Scaling teams & deployments |
| Event-Driven | Loose communication |
| CQRS | Read-heavy systems |

So far, we've been organizing **code**. Now let's organize an entire **system**.

---

# Part 3: System Design Fundamentals

## 🔟 Functional vs. Non-Functional Requirements

- **Functional** — what the system does (e.g. "users can post photos")
- **Non-functional** — how well it does it (e.g. latency under 100ms, 99.99% uptime, 1M requests/sec)

**Non-functional requirements usually shape the architecture more than the features do.**

---

## 1️⃣1️⃣ The Four Questions Every System Designer Asks

1. **Scalability** — can it handle more users?
2. **Availability** — can it survive failures?
3. **Performance** — can it stay fast?
4. **Consistency** — will the data stay correct?

System design gives you a toolbox where each tool improves one or more of these four goals.

---

## 1️⃣2️⃣ Scalability

**Vertical Scaling** — a bigger machine: more RAM, more CPU, more storage.
- Pros: very easy
- Cons: expensive, has hard limits

**Horizontal Scaling** — more servers: Server 1, Server 2, Server 3...
- Pros: almost unlimited, the industry standard
- Cons: more complex

**The Load Balancer:** say you scale to 20 servers, but they all still share one database — you've just moved the bottleneck. A load balancer is a server that sits in front of your application and distributes incoming requests across your servers.

---

## 1️⃣3️⃣ Availability

If a server crashes, should the whole system stop working? No — that's what **high availability** means: even if part of the system fails, users can still use it. Three ideas get you there:

- **Redundancy** — having backups. One server becomes three. Applies beyond servers too — database, network, load balancer.
- **Failover** — automatically switching to another server. Typically the load balancer checks `GET /health` every few seconds, and removes any server that fails it.
- **Replication** — copying data, so if one replica dies, you can still read from another.

---

## 1️⃣4️⃣ Performance

How long would *you* wait before closing Instagram? 1 second? 3? 10?

Performance means:
- **Fast responses** (low latency)
- **Handling many requests** (high throughput)

**Cache:** temporary, fast storage. Instead of `User → Database` on every request, you go `User → Redis → Database` — serving repeat requests from memory instead of hitting the database every time.

---

## 1️⃣5️⃣ Consistency

Making sure everyone sees the correct data — achieved through transactions, locks, and consensus.

**Banking example:** balance is $1000, you transfer $1000 out. Should another ATM still show $1000? No — banking requires **strong consistency**.

**Instagram example:** a like counter shows 500, then 501, then momentarily 500 again before settling at 502. Nobody notices or cares — this is **eventually consistent**, and that's perfectly fine here.

**The lesson:** not every system needs the same consistency guarantee. Match the guarantee to what's actually at stake.

---

# Part 4: Activity

## 1️⃣6️⃣ Warm-Up: Design Facebook, Together

Core features to account for:
- Login
- Create Post
- Like Post
- Comment
- Notifications

Walk through it as a group: what architecture, what modules, where would you add caching or events?

---

## 1️⃣7️⃣ Your Turn: Design Discord

**Core features:** Chat · Voice · Notifications · Friends · Online Status

**Your mission:**

1. Pick one architecture — Monolith / Modular Monolith / Microservices
2. Draw the modules
3. Pick an internal architecture — Layered / Hexagonal
4. Decide if you need events. If yes, which ones?
5. Identify your first scaling problem, and how you'd solve it — Cache? Replication? Load Balancer? Sharding?

---

# 🎓 Summary

## Key Takeaways

1. **Architecture is the set of decisions that are expensive to change later** — everything else is just a decision.
2. **Software architecture organizes code inside an app; system architecture organizes the whole system** — software, hardware, network, and the humans around it.
3. **Every architectural pattern exists to solve one specific problem** — pick based on the problem you actually have, not the pattern that sounds most impressive.
4. **Monolith → Modular Monolith → Microservices is a growth path, not a ranking** — most systems shouldn't start at the end of it.
5. **System design has four pillars** — scalability, availability, performance, consistency — and a toolbox (scaling, load balancers, redundancy, failover, replication, caching) where each tool serves one or more of them.
6. **Not everything needs strong consistency** — match the guarantee to what's actually at stake.

---
