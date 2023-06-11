import express from "express"
import { UpdateUser, getUser } from "../controllers/user.js"
import { verifyToken } from "../verifytoken.js"

const router = express.Router()

router.get('/:id', getUser)
router.put("/user/:id", verifyToken, UpdateUser)


export default router