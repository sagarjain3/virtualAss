import getToken from "../config/Token.js";
import User from "../models/UserModel.js";
import bcrypt from "bcryptjs"

export const signUp = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        const existEmail = await User.findOne({ email })

        if (existEmail) {
            return res.status(400).json({ msg: "email already exist" })
        }

        if (password.length < 6) {
            return res.status(400).json({ msg: "password must be at least 6 characters long" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        const token = getToken(user._id)
        console.log("Generated token:", token);


        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "lax",
            secure: false
        })

        return res.status(201).json(user)

    } catch (error) {
        console.log("signup error")
        return res.status(500).json({ msg: `sign up error ${error}` })
    }
}

export const login = async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ msg: "email does not already exist" })
        }



        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ msg: "password is incorrect" })
        }



        const token = getToken(user._id)
        console.log("Generated token:", token);


        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "lax",
            secure: false
        })

        return res.status(200).json(user)

    } catch (error) {
        console.log("login error")
        return res.status(500).json({ msg: `login error ${error}` })
    }
}

export const logOut = async (req, res) => {
    try {
        // Clear cookie with matching options
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "lax",
            secure: false
        })
        return res.status(200).json({ msg: "logOut successful" })

    } catch (error) {
        console.log("logout error")
        return res.status(500).json({ msg: `logout error ${error}` })
    }
}


