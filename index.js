import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
// import userRouter from "./Routes/users.js";
// import profileRouter from "./Routes/profile.js";
import userController from "./controller/userController.js";
import profileController from "./controller/profileController.js";
const app = express();
app.use(express.json());
dotenv.config()
const PORT = process.env.PORT
mongoose.connect("mongodb://localhost:27017/test01")
app.listen(PORT, ()=>{
    console.log(`Hello on `)
})
// app.use("/apiUser", userRouter)
// app.use("/apiProfile", profileRouter)

app.post("/register", userController.register)
app.post("/login", userController.login)
app.post("/logout", userController.logout)

app.put("/updateProfile/:id", profileController.updateProfile)
app.get("/getProfile/:id", profileController.getProfile)
app.delete("/deleteProfile/:id", profileController.deleteProfile)