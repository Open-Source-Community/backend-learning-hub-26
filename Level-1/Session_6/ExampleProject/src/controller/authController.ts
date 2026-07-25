import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users , User } from "../Data/data";

const maxAge = 60 * 60 // 1 hour

const createToken = (id: number ,role :string): string => {
  return jwt.sign({ id , role }, process.env.JWT_SECRET as string, {
    expiresIn: maxAge,
  })
}

// signUp

const signUp = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const userExists = users.find(u => u.email === email)

    if (userExists) {
      return res.status(400).json({ msg: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser: User = {
      id: users.length + 1,
      username,
      email,
      password: hashedPassword,
      role :"user"
    }

    users.push(newUser);

    res.status(201).json({
      status: 201,
      msg:"user created"
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
}

//signIn

const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password" })
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password" })
    }

    const token = createToken(user.id , user.role);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    })

    res.status(200).json({
      status: 200,
      data: user.username,
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error" })
  }
}

//signOut

const signOut = (req: Request, res: Response) => {
  res.clearCookie("token")

  res.status(200).json({
    status: 200,
    msg: "Logged out successfully",
  })
}
 const veiwAllusers = (req :Request ,res :Response) => {
 res.status(200).json({data : users})
 }

 export {signOut, signUp,signIn ,veiwAllusers}