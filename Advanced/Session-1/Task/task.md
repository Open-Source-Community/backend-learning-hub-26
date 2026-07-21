# 🕌 Souq El-Gomaa Goes National

> **The story:** You're Youssef, a self-taught developer who grew up going to Souq El-Gomaa every Friday with his dad — Cairo's legendary flea market, where you can find anything from antique radios to secondhand car parts. Youssef built a simple website so vendors could list their items online instead of only selling in person. It worked. Then it *really* worked. Over the next two years the app goes from Youssef alone, to a team of six, to handling Eid traffic that makes the servers cry. Every stage of this task is a real decision Youssef has to make — and like every real architecture decision, there's no single correct answer, only a *justified* one.

This task is different from the coding tasks you're used to — there's no server to run here. Your deliverable is a written document (and diagrams, if you'd like) explaining and justifying each decision. Treat it the way you'd treat a real design discussion with your team.

---

## Tasks

### 1️⃣ Year 1: The One-Man Stall

It's just Youssef. He needs to launch in a month, alone, with no budget for infrastructure.

**Decide and justify:** Monolith, Modular Monolith, or Microservices? Write 3–4 sentences explaining why, referencing what you'd be trading away by picking either of the other two options.

---

### 2️⃣ Year 2: The Team Grows

Youssef hires 5 more developers. Within weeks, two people keep breaking each other's code because everything lives in one tangled file, and nobody's sure who owns the checkout logic vs. the listings logic.

**Decide and justify:** Does the team move to Microservices, or restructure into a Modular Monolith? List the modules you'd split the app into (e.g. Users, Listings, Orders, Chat...) and explain what "clear ownership" would actually look like for this team.

---

### 3️⃣ Payments Keep Changing Providers

Youssef's team started with Fawry for payments. Finance now wants to add Paymob and InstaPay as options too, and might drop Fawry entirely next year.

**Decide and justify:** Which pattern fits the Payments module — Layered, or Hexagonal (Ports & Adapters)? Sketch (in text or as a diagram) what the Payments module looks like under your chosen pattern, and explain specifically what does *not* need to change when a new payment provider is added.

---

### 4️⃣ Ramadan Traffic Spike

Every Ramadan, traffic to the marketplace multiplies by 10x for a few weeks, then drops back to normal.

**Decide and justify:** Vertical or horizontal scaling — or both, at different times? What role does a load balancer play here, and what new problem appears the moment you have more than one server?

---

### 5️⃣ The Server That Went Down During Eid

On the biggest shopping day of the year, one of the servers crashes. The app doesn't go down — but you need to explain to Youssef *why*.

**Decide and justify:** Using redundancy, failover, and replication, explain (in your own words, using this specific scenario) how each of the three prevents the crash from becoming an outage. Be specific about what's being duplicated in each case.

---

### 6️⃣ Everyone's Browsing, Almost Nobody's Buying

The listings page gets hit with 50x more traffic than the "place an order" endpoint — people scroll for hours before ever buying anything.

**Decide and justify:** Where would you add caching, and what would you cache? What's the risk of caching data that changes often (like whether an item is still in stock)?

---

### 7️⃣ A New Listing Needs to Reach Five Different Systems

When a vendor posts a new listing, the app needs to: index it for search, notify users who favorited that seller, log it for analytics, and check it for banned items. Right now, the Listings service calls all four directly, and if the analytics service is slow, posting a listing is slow too.

**Decide and justify:** Would Event-Driven Architecture help here? Name the event you'd publish, and list which services would consume it. What's the tradeoff Youssef's team takes on by adopting this pattern?

---

### 8️⃣ Reviews Are Read Constantly, Written Rarely

A popular vendor's reviews get viewed thousands of times a day, but customers only leave a handful of new reviews per day.

**Decide and justify:** Is this a good candidate for CQRS? Explain what the separate read and write models might look like, and why it's *not* worth doing for a low-traffic feature like, say, editing a vendor's shop description.

---

### 9️⃣ A Bank Transfer vs. A "Views" Counter

Two features ship in the same release: (1) in-app wallet transfers between buyer and seller, and (2) a "X people viewed this listing" counter.

**Decide and justify:** Which one needs strong consistency, and which one is fine as eventually consistent? Explain what could actually go wrong if you got this backwards.

---

### 🔟 Draw the Whole Thing

Pull every decision above into a single diagram (hand-drawn, Excalidraw, draw.io — whatever you've got) showing: the overall architecture (Modular Monolith), the Payments module's internal pattern, where the load balancer and cache sit, and where your event flow goes. Attach it alongside your written answers.

---

## Expected Deliverable

| Task | What a strong answer includes |
|------|-------------------------------|
| 1–2 | A clear pick, not just "it depends" — with the actual tradeoff named |
| 3 | A concrete before/after: what changes vs. stays the same when swapping providers |
| 4–6 | The specific mechanism (load balancer, cache, replica) tied to *this* scenario, not just a definition |
| 7–8 | A named event or named read/write split — specific, not generic |
| 9 | The correct pairing, with a real failure scenario for getting it backwards |
| 10 | One diagram that ties every earlier decision together |

---

*Youssef didn't get any of this right on the first try either — that's what the design discussion is for. Yalla, sketch it out.* 🕌