import { Request, Response } from "express";
import { fleet, getNextId } from "../data/fleet";
import { Microbus } from "../data/types";

// GET /fleet
export function getAllMicrobuses(_req: Request, res: Response): void {
  res.status(200).json(fleet);
}

// GET /fleet/:id
export function getMicrobusById(req: Request, res: Response): void {
  const id = Number(req.params.id);
  const bus = fleet.find((b) => b.id === id);

  if (!bus) {
    res.status(404).json({ message: "Am Ashraf doesn't run that one" });
    return;
  }

  res.status(200).json(bus);
}

// POST /fleet
export function createMicrobus(req: Request, res: Response): void {
  const { driverName, route, farePerSeat, seatsAvailable } = req.body;

  const newBus: Microbus = {
    id: getNextId(),
    driverName,
    route,
    farePerSeat,
    seatsAvailable,
    ratings: [],
  };

  fleet.push(newBus);
  res.status(201).json(newBus);
}

// PUT /fleet/:id
export function updateMicrobus(req: Request, res: Response): void {
  const id = Number(req.params.id);
  const bus = fleet.find((b) => b.id === id);

  if (!bus) {
    res.status(404).json({ message: "Am Ashraf doesn't run that one" });
    return;
  }

  const { driverName, route, farePerSeat, seatsAvailable } = req.body;

  if (driverName !== undefined) bus.driverName = driverName;
  if (route !== undefined) bus.route = route;
  if (farePerSeat !== undefined) bus.farePerSeat = farePerSeat;
  if (seatsAvailable !== undefined) bus.seatsAvailable = seatsAvailable;

  res.status(200).json(bus);
}

// DELETE /fleet/:id
export function deleteMicrobus(req: Request, res: Response): void {
  const id = Number(req.params.id);
  const index = fleet.findIndex((b) => b.id === id);

  if (index === -1) {
    res.status(404).json({ message: "Am Ashraf doesn't run that one" });
    return;
  }

  const [removed] = fleet.splice(index, 1);
  res.status(200).json({
    message: `Bus ${removed.id} (${removed.route}) has been taken off the road.`,
  });
}

// GET /fleet/filter?maxFare=number
export function filterByMaxFare(req: Request, res: Response): void {
  const { maxFare } = req.query;

  if (maxFare === undefined) {
    res.status(400).json({ message: "maxFare query parameter is required." });
    return;
  }

  const max = Number(maxFare);

  if (Number.isNaN(max)) {
    res.status(400).json({ message: "maxFare must be a valid number." });
    return;
  }

  const results = fleet.filter((b) => b.farePerSeat <= max);
  res.status(200).json(results);
}

// GET /fleet/rate/:id?rater=name
export function getRating(req: Request, res: Response): void {
  const id = Number(req.params.id);
  const { rater } = req.query;

  if (!rater || typeof rater !== "string") {
    res.status(400).json({ message: "rater query parameter is required." });
    return;
  }

  const bus = fleet.find((b) => b.id === id);

  if (!bus) {
    res.status(404).json({ message: "Am Ashraf doesn't run that one" });
    return;
  }

  const ratingEntry = bus.ratings.find((r) => Object.prototype.hasOwnProperty.call(r, rater));

  if (!ratingEntry) {
    res.status(200).json({
      id: bus.id,
      rater,
      message: `${rater} hasn't rated this bus yet.`,
    });
    return;
  }

  res.status(200).json({
    id: bus.id,
    rater,
    rate: ratingEntry[rater],
  });
}
