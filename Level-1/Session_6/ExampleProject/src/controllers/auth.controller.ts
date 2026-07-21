import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users } from "../data/users.data";

const maxAge = 60 * 60; // 1 hour

const createToken = (id: number): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: maxAge,
  });
};

// SIGN UP

const signUp = async (req: Request, res: Response) => {
  
};


// SIGN IN
const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    const token = createToken(user.id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });

    res.status(200).json({
      status: 200,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

// SIGN  OUT

const signOut = (req: Request, res: Response): void => {
  res.clearCookie("token");

  res.status(200).json({
    status: 200,
    msg: "Logged out successfully",
  });
};
export { signUp, signIn, signOut };
