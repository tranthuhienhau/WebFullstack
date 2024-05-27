import express from 'express'
import dotenv from 'dotenv'
import mongoose from "mongoose";
import userRouter from "./Routes/users.js";
import profileRouter from "./Routes/profile.js";
const app = express();
app.use(express.json())
dotenv.config()
mongoose.connect("mongodb://localhost:27017/test01")
const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log("Server is running!!!")
})
app.use("/user", userRouter)
app.use("/profiles", profileRouter)