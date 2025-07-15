import express from "express"
import CheckAuth from "../middleware/CheckAuth.js"
import { askToAssistant, getCurrentUser, updataAssistant } from "../controller/UserController.js"
import upload from "../middleware/Multer.js"

const userRouter = express.Router()

userRouter.get("/current", CheckAuth, getCurrentUser)
userRouter.post("/update", CheckAuth, upload.single("assistantImage"), updataAssistant)
userRouter.post("/asktoassistant", CheckAuth, askToAssistant)

export default userRouter