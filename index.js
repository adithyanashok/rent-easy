import express from "express";
import cookieParser from 'cookie-parser'
import mongoose from "mongoose";
import dotenv from 'dotenv'
import authRouter from './routes/auth.js'
import postRouter from './routes/property.js'
import bookingnRouter from './routes/booking.js'
import chatRouter from './routes/chat.js'
import messageRouter from "./routes/message.js";
import userRouter from "./routes/user.js";
import cors from "cors"
import multer from "multer";
import path from "path";
import Razorpay from "razorpay";
import session from 'express-session'
const app = express()
const __dirname = path.resolve();

app.use("/images", express.static(path.join(__dirname, "/images")))



// File upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.array("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});

app.put("/api/upload", upload.array("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});

app.post("/user/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
}); // File upload end

// Middlewares

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.use(cookieParser())

app.use(cors({
    origin: [
        'http://localhost:3000'],
        credentials: true
}));

dotenv.config()

app.use(express.json())
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));


app.use("/auth", authRouter)
app.use("/api", postRouter)
app.use("/api/property", bookingnRouter)
app.use("/chat", chatRouter)
app.use("/message", messageRouter)
app.use("/user", userRouter)

// MongoDB connection


const mongoConnection = () => {
    mongoose.connect(process.env.MongoDB).then(() => {
        console.log("mongodb connected")
    }).catch((err) => {
        console.log(err)
    })
}


export const instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
});


// Error handling
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message
    })

})


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Port Running on ${PORT}`)
    mongoConnection()
})