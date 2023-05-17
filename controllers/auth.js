import User from "../models/user.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

// Create account and hash the password using bcrypt
export const CreateAccount = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = await User({ ...req.body, password: hash })
        const savedUser = await newUser.save()

        const token = jwt.sign({id: user._id}, process.env.JWT_SEC, {expiresIn:"10d"})
        const {password, ...others} = user._doc

        res.cookie(
            "access_token", token, {
                httpOnly: true,
                secures: true,
                sameSite: "none"
            }
        ).status(200).json(...others)
    } catch (error) {
        console.log(error)
    }
}

// Login process, compare database password and request password

export const Login = async (req, res) => {
    try {
        // find user with email id
        const user = await User.findOne({ email: req.body.email })

        // if user not found
        if (!user) return res.status(404).json("User not found")

        // now we have user now we need to check that user.password and req.body password
        const checkPassword = await bcrypt.compare(req.body.password, user.password)

        // throw a error if the password is incorrect
        if (!checkPassword) return res.status(400).json("Incorrect Password")
        const token = jwt.sign({id: user._id}, process.env.JWT_SEC, {expiresIn:"10d"})

        const { password, ...others } = user._doc
        res.cookie(
            "access_token", token, {
                httpOnly: true,
                secures: true,
                sameSite: "none"
            }
        ).status(200).json(others)
    } catch (error) {
        console.log(error)
    }
}