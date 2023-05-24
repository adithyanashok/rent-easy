import express from "express"
import { CreateBooking, GetUserBooking, confirm, intent } from "../controllers/booking.js"
import { verifyToken } from "../verifytoken.js"

const router = express.Router()



router.get("/booking/:userId", verifyToken, GetUserBooking)
// router.post("/booking", verifyToken, CreateBooking)
router.post("/create-payment-intent/:id", verifyToken, intent)
router.put("/", verifyToken, confirm)

export default router