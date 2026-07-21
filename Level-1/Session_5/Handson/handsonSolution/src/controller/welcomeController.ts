import { Request, Response } from "express";

// GET /welcome?name=YourName
export function getWelcomeMessage(req: Request, res: Response): void {
  const { name } = req.query;

  if (!name || typeof name !== "string") {
    res.status(400).json({ message: "Please provide a name query parameter." });
    return;
  }

  res.status(200).json({ message: `Welcome, ${name}! Glad to have you here.` });
}
