import express, { response } from "express"
import { CreateAccount, Login, logout } from "../controllers/auth.js"
import twilio from 'twilio';


const serviceSid = "VAd9be7cd92855397f1a35a7a63749c97f"
const accountSid = "AC4c5c5c429bb66a5e7277a49203f01dde"
const authToken = "3ae496fb0ed702811523b9643b687faf"
const client = twilio(accountSid, authToken)
const router = express.Router()

router.post("/signup", CreateAccount)
router.post("/login", Login)
router.post("/logout", logout)


export default router