import express from "express";
import { requestLogger } from "./middleware/logger";
import fleetRouter from "./router/fleetRouter";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(requestLogger);

app.use("/fleet", fleetRouter);

app.listen(PORT, () => {
  console.log(`🚕 Am Ashraf's fleet API is running on http://localhost:${PORT}`);
});
