import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDb from "./config/Db.js"
import authRouter from "./routes/AuthRoutes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/UserRoutes.js"




const app = express()

app.use(cors({
    origin: "https://virtualassistant-0ecb.onrender.com",
    credentials: true
}))

const port = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)


// app.get("/", (req, res) => {
//     res.send("Hello World")
// })



app.listen(port, () => {
    connectDb()
    console.log(`Server is running on port ${port}`)
})
