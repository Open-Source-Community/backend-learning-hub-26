import express from "express";
import welcomeRouter from "./router/welcomeRouter";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(welcomeRouter);

app.listen(PORT, () => {
  console.log(`👋 Welcome Desk is running on http://localhost:${PORT}`);
});
