import express from "express"
import { CreateChat, findChat, userChats } from "../controllers/chat.js"

const router = express.Router()

router.post("/", CreateChat)
router.get("/:id", userChats)

router.get("/find/:firstId/:secondId", findChat)



export default router