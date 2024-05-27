import {Router} from "express";
import userController from "../controller/userController.js";
import Profile from "../middleware/Profile.js";
const userRouter = Router();
userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login)
userRouter.post("/logout", userController.logout)
userRouter.get("/getAllUser",Profile.verifyToken, userController.getAllUser)
export default userRouter;