# 🕌 Souq El-Gomaa Goes National — Solution / Model Answer

> This is a model answer, not the only correct one. Architecture decisions are justified tradeoffs, not formulas — grade for sound reasoning, not for matching this document word-for-word.

---

### 1️⃣ Year 1: The One-Man Stall

**Pick: Monolith.**

Youssef is one person with a one-month deadline and no budget. A monolith means one codebase, one deployment, and no time spent on inter-service communication he doesn't need yet. Modular Monolith adds structure he doesn't need with a team of one — there's no one else to "own" a module. Microservices would mean Youssef manages multiple deployments, network calls, and infrastructure costs alone, for an app that doesn't have proven traffic yet. The right architecture for an unvalidated MVP is almost always the simplest one that lets you ship.

---

### 2️⃣ Year 2: The Team Grows

**Pick: Modular Monolith**, not Microservices yet.

Suggested modules: **Users** (auth, profiles), **Listings** (create/browse/search items), **Orders** (checkout, payment status), **Chat** (buyer-seller messaging). Each module gets its own folder/namespace with a clear owner or sub-team, but the app still deploys as one unit.

"Clear ownership" here means: the Orders module has one team responsible for it, changes to Orders go through that team's review, and — critically — other modules interact with Orders through a defined interface, not by reaching into its internals. This is what makes it different from the tangled Year-1 codebase: the boundaries are enforced by convention (and ideally tooling/lint rules), even though it's still one deployable app.

Microservices would be premature here: 6 developers don't need independent deployability yet, and the operational cost (service discovery, distributed debugging, network failures between services) isn't worth paying before it's needed. This is exactly the "stepping stone" argument from the session — Modular Monolith now, Microservices later *if* a specific module (like Orders, if it needs independent scaling) justifies being extracted.

---

### 3️⃣ Payments Keep Changing Providers

**Pick: Hexagonal Architecture (Ports & Adapters).**

```
Order/Checkout Business Logic
          ↓
    PaymentPort (interface: charge(), refund())
          ↓
  ┌───────┼────────┐
FawryAdapter  PaymobAdapter  InstaPayAdapter
```

The business logic ("charge the buyer, mark the order paid") only ever talks to the `PaymentPort` interface — it has no idea whether Fawry, Paymob, or InstaPay is behind it. Adding InstaPay means writing a new `InstaPayAdapter` that implements the same port; dropping Fawry means removing `FawryAdapter` and its wiring. **What does not change:** the checkout flow, the order status logic, and every other module that depends on "a payment happened" — none of them touch the adapter layer at all.

A plain Layered architecture would work too, but typically ties the service layer more directly to a specific provider's SDK, meaning a provider swap touches more files across more layers. Hexagonal is the better fit specifically *because* the provider is expected to change.

---

### 4️⃣ Ramadan Traffic Spike

**Pick: Horizontal scaling, with a load balancer**, not vertical.

The spike is temporary and 10x — vertical scaling (a bigger machine) has hard ceilings and you'd be paying for that bigger machine year-round for a few weeks of extra load. Horizontal scaling — spinning up more servers during Ramadan and scaling back down after — matches the actual shape of the traffic and is the industry-standard approach for elastic demand.

The moment there's more than one server, a **load balancer** becomes necessary to distribute incoming requests across them — without it, all the traffic still hits one server and the extra machines do nothing. And the new problem that appears immediately: all those servers likely still point at **one database**, which is now the bottleneck instead of the app server. Scaling the app tier without addressing the data tier just moves the traffic jam one layer deeper.

---

### 5️⃣ The Server That Went Down During Eid

- **Redundancy**: there wasn't just one server running the app — there were several (e.g. 3 instead of 1). Losing one still leaves others up.
- **Failover**: the load balancer was periodically checking `GET /health` on each server. The moment the crashed server stopped responding, the load balancer stopped routing traffic to it and shifted that traffic to the healthy servers — automatically, with no manual intervention.
- **Replication**: if the crashed component was a database node rather than an app server, replication means the data itself was copied across multiple database instances, so a crashed replica doesn't mean lost or inaccessible data — another replica still has it.

The specific thing being duplicated differs in each case: redundancy duplicates *capacity* (more servers than you need), failover is the *mechanism* that detects and reacts to a failure, and replication duplicates *data* specifically. Eid survives because all three combined — extra servers existed (redundancy), the broken one was detected and routed around (failover), and no data was lost in the process (replication).

---

### 6️⃣ Everyone's Browsing, Almost Nobody's Buying

Cache the **listings page** (and individual listing detail pages) — this is the read-heavy path getting 50x the traffic of checkout, and it's the highest-leverage place to add a cache like Redis: `User → Redis → Database` instead of hitting the database on every single browse.

**The risk:** stock status changes when an order is placed, but the cache doesn't automatically know that. If the cache isn't invalidated (or given a short expiry) when an item sells out, two buyers could both see "in stock" and both try to buy the last unit — a stale-cache bug, not a database bug. The fix is either a short cache TTL for fast-changing fields like stock count, or explicitly invalidating the cached entry the moment an order is placed. Don't cache checkout/order-placement itself — that path needs to hit the real data every time.

---

### 7️⃣ A New Listing Needs to Reach Five Different Systems

**Yes — Event-Driven Architecture fits well here.**

Event: `ListingCreated` (payload: listing ID, seller ID, category, timestamp).

Consumers: **Search Indexing Service** (index the new listing), **Notification Service** (alert users who favorited this seller), **Analytics Service** (log the event), **Content Moderation Service** (scan for banned items). The Listings service publishes one event to a message broker and moves on — it no longer waits on any of the four, and a slow analytics service can no longer slow down the act of posting a listing.

**The tradeoff:** the team gives up some immediacy and easy debugging. If the notification never arrives, there's no simple stack trace pointing at the failure — someone has to trace it through the broker. This is the "eventual consistency" and "where did this event go" cost mentioned in the session; it's worth paying here because none of the four consumers need to complete *before* the listing is considered "posted."

---

### 8️⃣ Reviews Are Read Constantly, Written Rarely

**Yes, CQRS fits this feature well** — but *only* this one.

**Write model:** a straightforward table/service that accepts a new review (rating, text, author) and validates it.

**Read model:** a heavily optimized, possibly pre-aggregated view — e.g. a cached summary (`averageRating`, `totalReviews`, `topReviews`) that's rebuilt or updated asynchronously whenever a write happens, so the thousands of daily page views hit a fast, pre-computed read path instead of recalculating an average across every review on every request.

**Why not the shop description field:** that feature is both low-read and low-write — there's no performance problem to solve, and CQRS would add a second model, a sync mechanism, and real complexity for a feature that a single simple model already handles fine. CQRS is a targeted answer to a read/write imbalance, not a default pattern to apply everywhere.

---

### 9️⃣ A Bank Transfer vs. A "Views" Counter

**Wallet transfers need strong consistency. The views counter is fine as eventually consistent.**

If the wallet balance were eventually consistent, a seller could see their balance hasn't updated yet and be told (incorrectly) they don't have enough funds — or worse, a race condition could let money be double-counted or a transfer processed twice before the balance catches up. This is exactly the banking example from the session: nobody should see two different balances for the same account.

If it were reversed — treating the view counter with the same strict consistency as a bank transfer — the app would pay for transaction locks and consensus overhead on a number nobody is relying on for anything important. Worst case if it's wrong: a listing briefly shows 501 views instead of 502. Nobody notices, nobody's harmed, and the performance cost of forcing strong consistency here would be pure waste.

---

### 🔟 Draw the Whole Thing

A strong diagram shows, at minimum:

```
                        ┌────────────┐
Users ──────────────▶  │Load Balancer│
                        └─────┬──────┘
                    ┌─────────┼─────────┐
                 Server 1   Server 2   Server 3   (Modular Monolith:
                    │          │          │         Users · Listings ·
                    └────┬─────┴────┬─────┘         Orders · Chat)
                         │          │
                    ┌────▼───┐  ┌───▼─────┐
                    │ Redis  │  │ Payments │──▶ PaymentPort ──▶ [Fawry|Paymob|InstaPay]
                    │(cache) │  │  Module  │
                    └────┬───┘  └──────────┘
                         │
                  ┌──────▼───────┐        publishes on new listing
                  │  Database    │◀───┐   ┌──▶ ListingCreated event
                  │ (+ replicas) │    └───┤       ↓
                  └──────────────┘        │  Search · Notifications ·
                                           │  Analytics · Moderation
                                           └── (message broker)
```

The exact shape matters less than showing all the pieces connected: load balancer in front of multiple app servers, the cache sitting between users and the database for reads, the Payments module isolated behind a port, and the event flow branching out to its four consumers.