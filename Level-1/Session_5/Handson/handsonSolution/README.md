# 👋 Welcome Desk

## Hands-On 1
`hands-on-1-single-file.ts` — everything (setup, route, logic) in one file.
Run directly with: `npx ts-node hands-on-1-single-file.ts` (after `npm install`)

## Hands-On 2 (restructured)
Same behavior, split into:
```
src/
  controller/welcomeController.ts   <- reads name, builds message
  router/welcomeRouter.ts           <- defines GET /welcome
  server.ts                         <- express setup, json(), mount router, listen
```

## Run
```bash
npm install
npm run dev     # or: npm run build && npm start
```

## Test
```
GET http://localhost:3000/welcome?name=YourName
```
Returns `200` with a welcome message including the name, or `400` if `name` is missing.
