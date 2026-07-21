import  {getfleet,getfleetbyid,addnew,updatemicrobus,deletemicrobus,filter,ratemicrobus} from "../controller/Microbus-controller";
import { Router } from "express";
import { validateMicrobus, loggingMiddleware } from "../middleware/Microbus-middle";

const router=Router();

router.use(loggingMiddleware);

router.get("/fleet",getfleet);
router.get("/fleet/filter",filter);
router.get("/fleet/rate/:id",ratemicrobus);
router.get("/fleet/:id",getfleetbyid);
router.post("/fleet", validateMicrobus, addnew);
router.put("/fleet/:id", validateMicrobus, updatemicrobus);
router.delete("/fleet/:id",deletemicrobus);

export default router;
