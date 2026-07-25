import { Router } from "express";
import {
  getAllMicrobuses,
  getMicrobusById,
  createMicrobus,
  updateMicrobus,
  deleteMicrobus,
  filterByMaxFare,
  getRating,
} from "../controller/fleetController";
import { validateMicrobus } from "../middleware/validateMicrobus";

const router = Router();

// IMPORTANT: specific routes like /filter and /rate/:id must come
// before the generic /:id route, otherwise Express will try to match
// "filter" or "rate" as an :id param.
router.get("/filter", filterByMaxFare);
router.get("/rate/:id", getRating);

router.get("/", getAllMicrobuses);
router.get("/:id", getMicrobusById);

router.post("/", validateMicrobus, createMicrobus);
router.put("/:id", validateMicrobus, updateMicrobus);
router.delete("/:id", deleteMicrobus);

export default router;
