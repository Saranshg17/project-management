import { Router } from "express";
import { registerUser,loginUser,logoutUser, AddTask } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
// router.route("/profile").post(newprofile)
// router.route("/default").post(defaultprofile)
// router.route("/updateprofile").post(updateProfile)
// router.route("/refreshtoken").post(refreshAccessToken)
// router.route("/deleteprofile").post(deleteProfile)

//secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/task").post(verifyJWT,AddTask)

export default router