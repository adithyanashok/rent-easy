import express from "express"
import { CreatePost, DeletePost, FetchPost, FetchPosts, FetchUserPosts, UpdateProperty } from "../controllers/property.js"
import { verifyHost, verifyToken } from "../verifytoken.js"

const router = express.Router()

router.post("/post",verifyToken, CreatePost)
router.get("/post", verifyToken, FetchPosts)
router.get('/post/user/:id', verifyToken, FetchUserPosts)
router.get("/post/:id", verifyToken, FetchPost)
router.delete("/post/:id", verifyToken, DeletePost)
router.put("/post/:id", verifyToken, UpdateProperty)



export default router