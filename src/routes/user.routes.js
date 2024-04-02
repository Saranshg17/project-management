import { Router } from "express";
import { registerUser,loginUser,logoutUser, AddTask, updateTask, deleteTask, gethistory, getAllTasks, deleteUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/task").post(verifyJWT,AddTask)
router.route("/update").post(verifyJWT,updateTask)
router.route("/delete").post(verifyJWT,deleteTask)
router.route("/history").get(verifyJWT,gethistory)
router.route("/getall").get(verifyJWT,getAllTasks)
router.route("/deleteuser").post(verifyJWT,deleteUser)

export default router