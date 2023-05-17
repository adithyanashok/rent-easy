import  express  from "express";
import user from './routes/user.js'
import mongoose from "mongoose";
import dotenv from 'dotenv'
import authRouter from './routes/auth.js'
import cors from "cors"

const app = express()
app.use(cors())
dotenv.config()
app.use(express.json())


app.use("/auth", authRouter)

const mongoConnection = () => {
    mongoose.connect(process.env.MongoDB).then(() => {
        console.log("mongodb connected")
    }).catch((err) => {
        console.log(err)
    })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Port Running")
    mongoConnection()
})