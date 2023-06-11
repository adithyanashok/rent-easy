import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../error.js";

// Create account and hash the password using bcrypt
export const CreateAccount = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = await User({ ...req.body, password: hash });
    const savedUser = await newUser.save();

    const token = jwt.sign(
      { id: savedUser._id, city: savedUser.city, host: savedUser.host },
      process.env.JWT_SEC,
      { expiresIn: "10d" }
    );
    const { password, ...others } = savedUser._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite:"none"
      })
      .status(200)
      .json(others);
  } catch (error) {
    console.log(error);
  }
};

// Login process, compare database password and request password

export const Login = async (req, res, next) => {
  try {
    // find user with email id
    const user = await User.findOne({ email: req.body.email });

    // if user not found
    if (!user) return next(createError(404, "please check your email"));

    // now we have user now we need to check that user.password and req.body password
    const checkPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // throw a error if the password is incorrect
    if (!checkPassword) return next(createError(400, "Incorrect password"));
    const token = jwt.sign(
      { id: user._id, city: user.city, host: user.host },
      process.env.JWT_SEC,
      { expiresIn: "10d" }
    );
    console.log(token);
    const { password, ...others } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite:"none"
      })
      .status(200)
      .json(others);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};
