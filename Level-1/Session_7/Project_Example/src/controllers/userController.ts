import { Request,Response } from "express"
import {User} from '../models/userModel'

//create a user
export const createUser = async(req:Request,res:Response) => {
      try{
        const user = await User.create(req.body)
        console.log("Created!",user)
        return res.status(201).json(user)
      }catch(e){
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred"
        console.log("Validation error:", errorMessage)
        return res.status(400).json({ error: errorMessage })
      }
}


//READ//
//1) Read all users
export const findUser = async(req: Request, res: Response) => {
  try{  
  const users = await User.find();
  console.log("All users: ", users);
  return res.json(users);
  }catch(e){
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred"
        console.log("Validation error:", errorMessage)
        return res.status(400).json({ error: errorMessage })
      }
}
 
//2) finding by a specific field (role: customer) 
export  const findUsersByRole = async(req: Request, res: Response) => {
  try{  
  const  role  = req.query.role as "customer" | "admin"
  const customers = await User.find({ role });
  console.log("Users with role: ", customers);
  return res.json(customers);
  }catch(e){
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred"
        console.log("Validation error:", errorMessage)
        return res.status(400).json({ error: errorMessage })
      }
}
 
//3) finding user using a specific mongoose keyword ($gt) 
export const findUsersOverAge = async(req: Request, res: Response) => {
  try{
  const { age } = req.query;
  const overThirty = await User.find({ age: { $gt: Number(age) } });
  console.log("Over given age: ", overThirty);
  return res.json(overThirty);
  }catch(e){
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred"
        console.log("Validation error:", errorMessage)
        return res.status(400).json({ error: errorMessage })
      }
}
 
//4) finding by ID
export const findUserById = async(req: Request, res: Response) => {
  try{  
  const userById = await User.findById(req.params.id);
  if (!userById) return res.status(404).json({ error: "User not found" });
  console.log("Found by ID: ", userById);
  return res.json(userById);
  }catch(e){
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred"
        console.log("Validation error:", errorMessage)
        return res.status(400).json({ error: errorMessage })
      }
}
 
//UPDATE//
//1) update a user by mongoose $set operator
export const updateUser = async(req: Request, res: Response) => {
  try{  
  const { role } = req.body;
  const result = await User.updateOne(
    { _id: req.params.id },
    { $set: { role } }
  );
  console.log("Updated!");
  return res.json(result);
}catch(e){
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred"
        console.log("Validation error:", errorMessage)
        return res.status(400).json({ error: errorMessage })
      }
}
 
//2) update a user by mongoose $push operator
export const addUserInterest = async(req: Request, res: Response) => {
  try{  
  const { interest } = req.body;
  const result = await User.updateOne(
    { _id: req.params.id },
    { $push: { interests: interest } }
  );
  console.log("Updated!");
  return res.json(result);
}catch(e){
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred"
        console.log("Validation error:", errorMessage)
        return res.status(400).json({ error: errorMessage })
      }
}
 
//3) update some users based on a shared attribute value
export const updateUsersByRole = async(req: Request, res: Response) => {
  try{  
  const { filterRole, newRole } = req.body;
  const result = await User.updateMany(
    { role: filterRole },
    { $set: { role: newRole } }
  );
  console.log("Updated!");
  return res.json(result);
}catch(e){
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred"
        console.log("Validation error:", errorMessage)
        return res.status(400).json({ error: errorMessage })
      }
}
 
//DELETE//
export const deleteUser = async(req: Request, res: Response) => {
  try{  
  const result = await User.deleteOne({ _id: req.params.id });
  console.log("Deleted!");
  return res.json(result);
  }catch(e){
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred"
        console.log("Validation error:", errorMessage)
        return res.status(400).json({ error: errorMessage })
      }
}
 
//The last version of the collection
export const finalState = async(req: Request, res: Response) => {
  try{  
  const finalState = await User.find();
  console.log("Final State: ", finalState);
  return res.json(finalState);
  }catch(e){
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred"
        console.log("Validation error:", errorMessage)
        return res.status(400).json({ error: errorMessage })
      }
}
 


