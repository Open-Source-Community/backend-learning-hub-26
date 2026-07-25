## 📝  Tasks

###  task 1: Build the Auth System

Using the pattern from the session, build a small Express + TypeScript auth system with a fake (hardcoded) user database:

- A `User` interface with `id`, `username`, `email`, `password` (hashed), and `role` (`"user" | "admin"`)
- `POST /auth/signup` — creates a new user, hashing the password with `bcryptjs` before storing it
- `POST /auth/signin` — checks the email/password, and on success generates a JWT and sends it back as an `httpOnly` cookie
- `GET /auth/signout` — clears the auth cookie
- An `authentication` middleware that checks for a valid token in the cookies before letting a request through
- `GET /auth/profile` — protected by the `authentication` middleware, returns a simple "you are authenticated" message

Test all four routes in Postman: sign up a new user, sign in with it, hit `/profile` (should work), then sign out and hit `/profile` again (should fail with `401`).

---

### task 2: Add Authorization

Authentication only answers "who are you" — now add "what are you allowed to do."

- Write an `authorization` middleware that runs **after** `authentication`, and checks the logged-in user's `role`
- Add a new route, `GET /auth/admin-only`, protected by **both** `authentication` and `authorization`, that only responds successfully if the user's role is `"admin"`
- If a regular `"user"` tries to access it, respond with `403` and a clear message
- If it works, respond with `200` and something like `"Welcome, admin!"`

Test it with both an admin account and a regular user account, and confirm the regular user gets blocked.

---

###  Done When

- `POST /auth/signup` creates a user with a hashed password (never store plain text)
- `POST /auth/signin` returns a cookie containing a valid JWT
- `GET /auth/profile` works while signed in, and returns `401` after signing out
- `GET /auth/admin-only` returns `200` for an admin account and `403` for a regular user
- No route trusts a `role` value sent directly from the client — it always comes from the logged-in user's own record