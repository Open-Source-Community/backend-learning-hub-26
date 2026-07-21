import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {

  const token = req.cookies?.token;

 
  if (!token) {
    res.status(401).json({ msg: "Unauthorized" });
    return;
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET as string);


    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

export { authentication };
