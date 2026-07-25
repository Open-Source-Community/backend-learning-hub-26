import {signOut, signUp , signIn , veiwAllusers} from "../controller/authController"
import {authorization} from "../middleware/middleware"
import {Router} from "express"

const router =Router()

router.post("/signUp",signUp)
router.post("/signIn",signIn)
router.get("/signOut",signOut)

router.get("/Users" ,authorization ,veiwAllusers)

export {router}