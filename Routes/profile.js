import {Router} from "express";
import profileController from "../controller/profileController.js";
const profileRouter = Router();
profileRouter.put("/profile/:id", profileController.updateProfile);
profileRouter.get("/profile/:id",profileController.getProfile);
profileRouter.delete("/profile/:id", profileController.deleteProfile)
profileRouter.post("/profile",profileController.postProfile)
export default profileRouter;