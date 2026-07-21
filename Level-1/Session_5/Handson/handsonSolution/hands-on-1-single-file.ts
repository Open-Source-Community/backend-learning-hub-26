import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

// GET /welcome?name=YourName
app.get("/welcome", (req: Request, res: Response) => {
  const { name } = req.query;

  if (!name || typeof name !== "string") {
    res.status(400).json({ message: "Please provide a name query parameter." });
    return;
  }

  res.status(200).json({ message: `Welcome, ${name}! Glad to have you here.` });
});

app.listen(PORT, () => {
  console.log(`👋 Welcome Desk is running on http://localhost:${PORT}`);
});
