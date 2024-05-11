import {Router} from "express";
import userController from "../controller/userController.js";
const userRouter = Router();
userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login)
userRouter.post("/logout", userController.logout)
export default userRouter;