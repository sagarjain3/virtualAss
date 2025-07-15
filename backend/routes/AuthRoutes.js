import express from "express"
import { login, logOut, signUp } from "../controller/Auth.js"
const authRouter = express.Router()

authRouter.post("/signup", signUp)
authRouter.post("/login", login)
authRouter.get("/logout", logOut)

export default authRouter