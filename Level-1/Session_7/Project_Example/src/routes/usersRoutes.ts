import { Router } from "express";
import {
  createUser,
  findUser,
  findUsersByRole,
  findUsersOverAge,
  findUserById,
  updateUser,
  addUserInterest,
  updateUsersByRole,
  deleteUser,
  finalState,
} from "../controllers/userController";
 
const router = Router();
 
//CREATE
router.post("/", createUser);
 
//READ
router.get("/", findUser);                  // GET /api/users
router.get("/role", findUsersByRole);        // GET /api/users/role?role=customer
router.get("/over-age", findUsersOverAge);   // GET /api/users/over-age?age=30
router.get("/final-state", finalState);  // GET /api/users/final-state
router.get("/:id", findUserById);            // GET /api/users/:id (keep LAST among GETs)
 
//UPDATE
router.patch("/:id", updateUser);                // body: { role }
router.patch("/:id/interests", addUserInterest); // body: { interest }
router.patch("/bulk/role", updateUsersByRole);   // body: { filterRole, newRole }
 
//DELETE
router.delete("/:id", deleteUser);
 
export default router;
 