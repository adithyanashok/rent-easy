import express from "express"
import { GetUserBooking, RazorpayInt, confirm, intent, verifyPayment } from "../controllers/booking.js"
import { verifyToken } from "../verifytoken.js"

const router = express.Router()



router.get("/booking/:userId", verifyToken, GetUserBooking)
// router.post("/booking", verifyToken, CreateBooking)
router.post("/create-payment-intent/:id", verifyToken, intent)
router.post("/create-razorpay-intent/:id", verifyToken, RazorpayInt)
router.post("/paymentVerify", verifyPayment)


router.put("/", verifyToken, confirm)

export default router