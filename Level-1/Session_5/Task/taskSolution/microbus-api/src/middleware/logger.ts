import { Request, Response, NextFunction } from "express";

// Am Ashraf wants a record of who's been checking on his fleet
export function requestLogger(req: Request, _res: Response, next: NextFunction): void {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
}
