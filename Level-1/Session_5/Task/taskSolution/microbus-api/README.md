# 🚕 Am Ashraf's Microbus Fleet API

Express + TypeScript API for managing Am Ashraf's microbus fleet (drivers, routes, fares, seats, and passenger ratings). Tested end-to-end and working.

## Setup

```bash
npm install
```

## Run (development, auto-reload)

```bash
npm run dev
```

## Run (production build)

```bash
npm run build
npm start
```

Server runs on `http://localhost:3000`.

## Project Structure

```
src/
  data/         seed data + Microbus/Rating types
  middleware/   request logger + validateMicrobus
  controller/   handler logic for every route
  router/       wires routes -> middleware -> controllers
  server.ts     slim entry point
```

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/fleet` | List all microbuses |
| GET | `/fleet/:id` | Get one microbus |
| POST | `/fleet` | Add a new microbus |
| PUT | `/fleet/:id` | Update a microbus (partial) |
| DELETE | `/fleet/:id` | Remove a microbus |
| GET | `/fleet/filter?maxFare=N` | Microbuses with `farePerSeat <= N` |
| GET | `/fleet/rate/:id?rater=name` | A specific passenger's rating of a bus |

All endpoints have been manually tested with curl/Postman and match the status codes and payloads described in the task (200/201/400/404).
