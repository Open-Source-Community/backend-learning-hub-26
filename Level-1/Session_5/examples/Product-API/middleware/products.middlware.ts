import { Request, Response, NextFunction } from "express";

const validateProduct = (req: Request, res: Response, next: NextFunction) => {
  const { name, description, price, category } = req.body;

  if (!name || !description || !price || !category) {
    return res.status(400).send({
      status: 400,
      message: "Missing required fields"
    });
  }

  next(); // everything is okay → go to controller
};

export  {validateProduct};











