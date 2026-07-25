import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authorization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const token = req.cookies?.token;

  if (!token) {
   return res.status(401).json({ msg: "Unauthorized" });
  }

  try {
   const decoded = jwt.verify(token ,process.env.JWT_SECRET as string) as { id: number , role :string}

if(decoded.role !== "admin"){
    return res.status(401).json({msg:"unauthorized"})
}
next()
  } catch (error) {
    return res.status(401).json({ msg: "Invalid token" })
  }
}

export { authorization }
