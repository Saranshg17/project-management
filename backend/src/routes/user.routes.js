import { Router } from "express";
import { registerUser,loginUser,logoutUser, AddTask, updateTask, deleteTask, gethistory, getAllTasks, deleteUser, AddCustom, UpdateCustom, AddProject } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/project").post(AddProject)

//secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/task").post(verifyJWT,AddTask)
router.route("/update").put(verifyJWT,updateTask)
router.route("/delete").delete(verifyJWT,deleteTask)
router.route("/history").get(verifyJWT,gethistory)
router.route("/getall").get(verifyJWT,getAllTasks)
router.route("/deleteuser").delete(verifyJWT,deleteUser)
router.route("/addcustom").put(verifyJWT,AddCustom)
router.route("/updatecustom").put(verifyJWT,UpdateCustom)

export default router