import express from "express"
import { CreateAccount, Login, logout } from "../controllers/auth.js"

const router = express.Router()

router.post("/signup", CreateAccount)
router.post("/login", Login)
router.post("/logout", logout)



export default router