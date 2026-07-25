# Session 7: Introduction to Databases & NoSQL with MongoDB

## 📋 Session Agenda

**Part 1: What Is a Database?**

1. Data storage before computers
2. The flat file model and its problems
3. Hierarchical and network models
4. The relational breakthrough
5. Commercialization and the rise of Oracle
6. The rise of NoSQL

**Part 2: Types of Databases**

1. Relational (SQL) vs. Non-Relational (NoSQL)
2. What is SQL, and why was it invented
3. Terminology check: Database vs. DBMS vs. SQL vs. NoSQL
4. When to use SQL vs. when to use NoSQL

**Part 3: Introduction to NoSQL**

1. What NoSQL is, and why it was invented
2. Types of NoSQL databases
3. The Document model

**Part 4: Why MongoDB?**

**Part 5: MongoDB Core Concepts**

1. MongoDB's structure: database, collections, documents, fields
2. `_id`, nested documents, and arrays
3. Flexible schema vs. schema-less

**Part 6: Schema — SQL vs. MongoDB**

**Part 7: Basic CRUD Operations**

**Part 8: MongoDB in Real Applications**

**Part 9: Common Mistakes & When NOT to Use MongoDB**

---

## 🎯 Session Objectives

By the end of this session, you will be able to:

1. Explain why databases exist and how they evolved from paper records to modern DBMSs
2. Distinguish between a database, a DBMS, SQL, and NoSQL
3. Explain the difference between relational (SQL) and non-relational (NoSQL) databases
4. Describe the Document model and why MongoDB uses it
5. Read MongoDB's structure (database → collection → document → field) and map it to the relational equivalent
6. Decide, for a given problem, whether a relational or non-relational database is the better fit

---

# Part 1: What Is a Database?

## 1️⃣ Let's Go Back a Little Bit — Before Computers Existed

Long before computers, people still needed to store and retrieve data. They used:

- Ancient Egyptian walls
- Mesopotamian clay tablets
- Paper records, ledgers, and notebooks
- Filing cabinets and index cards

**The problem:**

- Searching took a long time
- Data was duplicated
- Records were easy to lose or damage
- Only one person could access a record at a time

`CTRL + F` did not exist. 🙂

## 2️⃣ Enter Computers — The Flat File Model

Data moved from paper to digital files, which made processing faster — but the underlying problems didn't go away.

> Computers changed the tool, not the problem.

**What is a flat file?**

- One big file (or several separate files) where all data is written directly inside — no layers, no logic, no relationships between files
- Examples: text files, CSV files

**Problems with flat files:**

- Data duplication
- Hard to update
- Inconsistent data
- No structure enforcement

## 3️⃣ Hierarchical and Network Models (Mid-1960s)

**Hierarchical Model**

- IBM introduced the Information Management System (IMS)
- Used a tree structure where parent nodes point to child nodes
- Successful for projects like NASA's lunar lander, but rigid

**Network Model**

- A more flexible model developed by Charles Bachmann at GE
- Allowed child nodes to have multiple parents
- Became too difficult to manage as the web of pointers between records grew complicated

## 4️⃣ The Relational Breakthrough (1970)

- IBM scientist **Ted Codd** proposed the **relational database** model
- Data was organized into simple **tables**
- Tables connected through matching data fields (keys) instead of complex pointers — much easier to access and change information
- Despite its brilliance, IBM was slow to adopt it, since it competed with their own profitable IMS product

## 5️⃣ Commercialization and Competition (1973–1979)

| Year | Milestone |
|---|---|
| 1973 | Researchers at UC Berkeley built **Ingres**, a database many companies used as a foundation for their own products |
| 1975 | IBM built an experimental system called **System R**, which introduced **SQL** — the language still used today to search and change data |
| 1977–1979 | **Larry Ellison** saw the opportunity, built a compatible database, and released **Oracle** in 1979 — beating IBM to market by several years |

## 6️⃣ Modern Dominance (1983–Present)

- By 1983, Oracle's software ran on almost every computer, including IBM's own machines
- By the time IBM released its own commercial product (**DB2**), Oracle had already captured the market
- Because of this early competition, **relational databases became the global standard** — they still organize the data behind shopping, work, and communication today

## 7️⃣ The Rise of NoSQL (Late 2000s)

As the internet grew, companies like Google and Amazon needed to handle massive amounts of **unstructured data** (social media posts, images) that didn't fit neatly into relational tables.

**NoSQL ("Not Only SQL")** databases emerged to store data flexibly and spread it across thousands of servers — prioritizing speed and scale over the strict table structure of the relational model.

### Summary So Far

- Databases existed long before computers
- Computers changed the medium, not the problem
- Flat files stored data, but didn't manage it
- Databases were invented to: organize data, prevent duplication, enable fast search, and support multiple users

---

# Part 2: Types of Databases

## 8️⃣ Are All Databases the Same?

No — different databases solve different problems:

- Different problems
- Different data shapes
- Different scale requirements

**Two main types:**

- Relational Databases (SQL)
- Non-Relational Databases (NoSQL)

## 9️⃣ Relational Databases (SQL)

- Data stored in **tables**
- **Fixed schema**
- Strong relationships between tables (via keys)
- **ACID** guarantees (Atomicity, Consistency, Isolation, Durability)

### What Is SQL?

- **S**tructured **Q**uery **L**anguage
- SQL is **not** a database — it's a language used to talk to a database
- Used to store, read, update, and delete data
- Works with relational databases
- Not a general-purpose programming language like Java or Python

### Why Was SQL Invented?

- Data was stored in tables
- Humans needed a simple way to ask questions about that data
- Databases needed a standard way to understand those requests

> SQL exists to ask questions about data.

**SQL DBMS examples:** PostgreSQL, MySQL, SQLite, Oracle

## 🔟 Non-Relational Databases (NoSQL)

- Flexible schema
- Different data models (not just tables)
- Designed for scale
- High availability

### What Is NoSQL?

- A way to store and access data
- Designed for flexibility and scale
- Uses several different data models
- Widely used in modern applications

> NoSQL is a category, not a single tool.

### Why Was NoSQL Invented?

- Data became large and diverse
- Schemas changed frequently
- Systems needed to scale **horizontally** (more servers, not just a bigger one)
- Performance under high traffic mattered

**NoSQL DBMS examples:**

| Model | Example |
|---|---|
| Document | MongoDB |
| Key-Value | Redis |
| Column | Cassandra |
| Graph | Neo4j |

## 1️⃣1️⃣ Terminology Alert 🚨

It's easy to mix these four terms up — here's the difference:

| Term | What it actually is |
|---|---|
| **Database** | Just organized data, stored somewhere |
| **DBMS** | The *software* that manages that data — stores it, protects it, organizes it, and controls access to it |
| **SQL** | The *language* used to communicate with a (relational) DBMS — how you tell it what to do with the data |
| **NoSQL** | A *category* of databases that are not based on the relational table model — "Not Only SQL" |

## 1️⃣2️⃣ So, When to Use What?

**Use a Relational DB (SQL) when…**

- Data has strong relationships (e.g., `User` → has many `Orders` → has many `Products`)
- You need strict consistency (ACID) — e.g., banking, payments, inventory, where you cannot afford double payments or lost transactions
- Your data structure is stable — tables rarely change shape, schema is clear and predictable

**Use a Non-Relational DB (NoSQL) when…**

- Data is flexible or unstructured (e.g., posts with different fields, user profiles with optional data)
- You need massive horizontal scaling — social media, real-time analytics, IoT, logging platforms
- Your app doesn't rely heavily on JOINs — it mostly fetches full objects, stores nested data, and doesn't need complex relational queries

**Side quest:** Look into *Hybrid Database architecture* — many real systems use SQL and NoSQL together rather than picking just one.

### Summary So Far

- Database design didn't start with just two types — early models were structured, but rigid
- In 1970, the relational model was introduced — tables and logical queries changed everything
- Relational databases dominated for decades
- Then data grew bigger and more complex — applications needed more flexibility and scale
- New database models emerged and became known as NoSQL
- Databases evolved as data evolved

---

# Part 3: Introduction to NoSQL

## 1️⃣3️⃣ The Internet Changed, So Databases Had To Change Too

**NoSQL (Not Only SQL):**

- A category of databases designed for massive data volume and flexible structures
- Moved away from one big server (**vertical scaling**) toward distributing data across a team of servers (**horizontal scaling**)
- No complex tables linked by keys
- You don't need to define every column before adding data

**When to use NoSQL:**

- Rapid development
- Frequently changing data structure
- High-traffic systems
- Large-scale distributed apps

## 1️⃣4️⃣ NoSQL Is Not One Thing

NoSQL is an umbrella term covering several different data models:

- Document
- Key-Value
- Column-Family
- Graph

**Today's focus:** the **Document** model, using **MongoDB**.

## 1️⃣5️⃣ What Is the Document Model?

- Data is stored as **documents** instead of rows in tables
- Each document is:
  - Self-contained
  - JSON-like
  - Flexible in structure

---

# Part 4: Why MongoDB?

- MongoDB is the most popular DBMS for NoSQL Document-model databases
- Easy to learn and developer-friendly
- Uses a JSON-like structure
- Widely used in modern web applications
- Strong community & ecosystem

---

# Part 5: MongoDB Core Concepts

## 1️⃣6️⃣ MongoDB Structure

How MongoDB organizes data, mapped to the relational world:

| MongoDB | Relational Equivalent |
|---|---|
| Database | Database |
| Collection | Table |
| Document | Row |
| Field | Column |

```
MongoDB Database
 └── Collections (contain many documents)
      └── Documents (contain fields — key/value pairs)
```

## 1️⃣7️⃣ Documents in Practice

```json
{
  "_id": "665f1a2b3c4d5e6f7a8b9c0d",
  "username": "Sindibad",
  "role": "navigator",
  "islands_visited": ["Rhodes", "Cyprus"],
  "ship": {
    "name": "Al Naser",
    "crewSize": 12
  }
}
```

- Documents can contain other documents → **nested documents** (e.g., `ship` above)
- Documents can store lists → **arrays** (e.g., `islands_visited` above) — a relational database would typically need a separate table for this
- Every document has an `_id` field:
  - This is MongoDB's primary key
  - It's a unique identifier
  - It's automatically generated if you don't provide one
  - It's used to retrieve the document

> MongoDB stores data as flexible, JSON-like documents.

---

# Part 6: Schema — SQL vs. MongoDB

## 1️⃣8️⃣ What Is a Schema?

A schema defines:

- What fields exist
- Their data types
- Which fields are required vs. optional
- Relationships between data

> A schema is the structure blueprint of your data.

## 1️⃣9️⃣ SQL Schema (Strict)

Before inserting data, you must:

- Define the table
- Define the columns
- Define the data types
- Define the constraints

> Structure first, data second.

## 2️⃣0️⃣ MongoDB Schema (Flexible)

- No need to predefine structure
- Related pieces of information can live in separate documents linked by an id (e.g., a `user` document referenced by a `contact` document and an `access` document), instead of separate rigid tables

> Data first, structure optional.

**Important note:** MongoDB is **schema-flexible, not schema-less**. You can still:

- Enforce a schema using validation rules
- Define structure at the application level (e.g., with TypeScript interfaces or a library like Mongoose)

---

# Part 7: Basic CRUD Operations

**CRUD** — the same four operations from Session 5, applied to documents instead of rows:

| CRUD | MongoDB Operation |
|---|---|
| **C**reate | Insert |
| **R**ead | Find |
| **U**pdate | Update |
| **D**elete | Delete |

*(Hands-on: writing these operations with the MongoDB driver/shell.)*

---

# Part 8: MongoDB in Real Applications

**Where MongoDB actually shines:**

- Data structure changes frequently
- Rapid development is required
- Applications need to scale horizontally
- Data is naturally document-like

**Examples:**

- Social media platforms
- Chat applications
- Content management systems
- Analytics dashboards

---

# Part 9: Common Mistakes & When NOT to Use MongoDB

## 2️⃣1️⃣ Common Mistakes

- Ignoring schema design
- Overusing embedding (nesting too much inside one document)
- No proper indexing
- Treating MongoDB like SQL
- Assuming it replaces relational databases entirely

## 2️⃣2️⃣ When NOT to Use MongoDB

- Complex joins across many entities
- Strict ACID financial systems
- Strong relational integrity requirements
- Heavy transactional systems

> Banking systems are better suited to relational databases.

## 2️⃣3️⃣ Trade-offs

**MongoDB gives you:**

- Flexibility
- Horizontal scalability

**But you give up:**

- Strong enforced relationships
- Strict schema control
- Traditional joins

> Choose based on the problem — MongoDB is not *better* than SQL, it's better *for certain problems*.

---

# 🎓 Summary

## Key Takeaways

1. **Databases predate computers** — computers changed the medium of storage, not the underlying need for organization, deduplication, search, and multi-user access.
2. **Relational databases (SQL)** organize data into fixed-schema tables connected by keys, with ACID guarantees — ideal for strongly related, consistency-critical data.
3. **NoSQL is an umbrella term**, not a single technology — Document, Key-Value, Column, and Graph are all different data models built for flexibility and horizontal scale.
4. **MongoDB is a Document-model database**: Database → Collection → Document → Field, with every document carrying a unique `_id`.
5. **MongoDB is schema-flexible, not schema-less** — structure can still be enforced through validation or at the application level.
6. **The right database depends on the problem** — strong relationships and strict consistency point to SQL; flexible, fast-changing, high-scale data points to NoSQL.

---

## 🧭 Side Quests 

1. Research **Hybrid Database architecture** — how real systems combine SQL and NoSQL.
2. Build a practical decision file/cheat sheet: *"Should I use a Relational Database or a Non-Relational Database?"*
