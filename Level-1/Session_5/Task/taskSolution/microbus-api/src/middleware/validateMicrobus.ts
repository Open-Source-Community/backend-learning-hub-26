import { Request, Response, NextFunction } from "express";

// Am Ashraf doesn't trust empty seats (or empty request bodies)
export function validateMicrobus(req: Request, res: Response, next: NextFunction): void {
  const { driverName, route, farePerSeat, seatsAvailable } = req.body;
  const isUpdate = req.method === "PUT";

  // For POST, all fields are required. For PUT, only validate the fields that were sent.
  if (!isUpdate) {
    if (
      driverName === undefined ||
      route === undefined ||
      farePerSeat === undefined ||
      seatsAvailable === undefined
    ) {
      res.status(400).json({
        message:
          "Missing required fields. Need driverName, route, farePerSeat, and seatsAvailable.",
      });
      return;
    }
  }

  if (farePerSeat !== undefined && (typeof farePerSeat !== "number" || farePerSeat < 0)) {
    res.status(400).json({ message: "farePerSeat must be a non-negative number." });
    return;
  }

  if (
    seatsAvailable !== undefined &&
    (typeof seatsAvailable !== "number" || seatsAvailable < 0)
  ) {
    res.status(400).json({ message: "seatsAvailable must be a non-negative number." });
    return;
  }

  if (driverName !== undefined && typeof driverName !== "string") {
    res.status(400).json({ message: "driverName must be a string." });
    return;
  }

  if (route !== undefined && typeof route !== "string") {
    res.status(400).json({ message: "route must be a string." });
    return;
  }

  next();
}
