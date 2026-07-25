import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Passenger from "../models/passenger";

dotenv.config();

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Airport Check-in System");
});

app.post("/passengers", async (req, res) => {
  try {
    const passenger = await Passenger.create(req.body);

    res.status(201).json(passenger);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/passengers/:id", async (req, res) => {
  try {
    const passenger = await Passenger.findById(req.params.id);

    res.status(200).json(passenger);
  } catch (err) {
    res.status(500).json(err);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});