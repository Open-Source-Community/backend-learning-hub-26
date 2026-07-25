import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./mongoDB";
import app from "./server";

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});