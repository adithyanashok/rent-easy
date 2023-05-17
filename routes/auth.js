import express from "express"
import { CreateAccount, Login } from "../controllers/auth.js"

const router = express.Router()

router.post("/signup", CreateAccount)
router.post("/login", Login)


export default router