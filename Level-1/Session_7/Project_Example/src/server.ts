import express from "express";
import router from "./routes/usersRoutes";

const app = express();

app.use(express.json());
app.use("/api/users", router);

export default app;