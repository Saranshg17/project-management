import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { users } from "../models/user.model.js";
import { tasks } from "../models/task.model.js";
import { history } from "../models/history.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";



const generateAccessandRefreshToken = async(userId) => {
    try{
        const user= await users.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken=refreshToken
        await user.save({validateBeforeSave:false})

        return {accessToken,refreshToken}

    }catch(error){
        throw new ApiError(500,"Something went wrong while generating tokens")
    }
}


const registerUser = asyncHandler(async (req,res) => {
    //get user details from frontend
    const {email,password,role}=req.body
    console.log(req.body)

    //validation - not empty
    if(
        [email,password].some((field)=>field?.trim()==="")
    ){
        throw new ApiError(400, "Email and password can't be empty")
    }


    // check if already exists: email, profile
    const existeduser = await users.findOne({
        $and: [{ email }]
    })
    if (existeduser){
        throw new ApiError(409,"email already registered")
    }

    // const Profile = await profiles.create({
    //     ProfileName: profile || "Profile-1",
    //     Categories: categories.split("-") || []
    // })

    //create user object-create entry in db
    const user = await users.create({
        email: email,
        password: password,
        Role: role
        // categories: categories || ""
    })

    //remove password and refresh token field from response
    const registeredUser = await users.findById(user._id).select(
        "-password -refreshToken"
    )

    console.log(registeredUser)

    //check for user creation
    if(!registeredUser){
        throw new ApiError(500,"Something went wrong while registering the user")
    }


    //return response
    return res.status(201).json(
        new ApiResponse(200,registeredUser,"profile registered successfully")
    )
})

const loginUser = asyncHandler(async (req,res) => {
    //get details from frontend
    const {email,password} = req.body
    console.log(req.body)

    //validation - not empty
    if(
        [email,password].some((field)=>field?.trim()==="")
    ){
        throw new ApiError(400, "Email and password can't be empty")
    }

    //access user object form db
    const user = await users.findOne({ email })

    if(!user){
        throw new ApiError(404,"User doesn't exist")
    }

    //validation -correct credentials
    const validation =await user.isPasswordCorrect(password)

    if(!validation){
        throw new ApiError(401,"Email or Password is incorrect")
    }


    //generate access token and refresh token and updating database
    const {accessToken, refreshToken} =await generateAccessandRefreshToken(user._id)

    //remove password and refreshToken from response
    const userUpdated = await users.findById(user._id).select(
        "-password -refreshToken"
    )

    //send cookies
    const options = {
        httpOnly: true,
        secure: true
    }

    //return response
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user:userUpdated,accessToken,refreshToken
            },
            "User logged in Successfully"
        )
    )

})

const logoutUser = asyncHandler(async(req,res)=>{
    await users.findByIdAndUpdate(req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    //send cookies
    const options = {
        httpOnly: true,
        secure: true
    }
    
    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200, {},"User logged out"))
})

const AddTask = asyncHandler(async(req,res)=>{
    if(req.user.Role==="Standard User"){
        throw new ApiError(404 ,"You don't have access to create tasks")
    }

    const {name,description,Assignee_id,category} = req.body  

    if(
        [name,description,Assignee_id,category].some((field)=>field?.trim()==="")
    ){
        throw new ApiError(400, "Some required fields are empty")
    }

    const assignee = await users.findById(Assignee_id);

    if(!assignee){
        throw new ApiError(404, "Assignee not found")
    }

    const task = await tasks.create({
        Name: name,
        Description: description,
        Status: "Started",
        Assigned_to: Assignee_id,
        Assigned_by: req.user._id,
        Category: category
        // categories: categories || ""
    })

    let task_ = assignee.tasks;

    task_.push(task._id)

    await users.findByIdAndUpdate(Assignee_id,
        {
            $set: {
                tasks:task_
            }
        },
        {
            new: true
        }
    )

    const his = await history.create({
        TaskId: task._id,
        TaskUpdate: "New task created",
        Assigned_to: Assignee_id,
        Assigned_by: req.user._id
    })

    return res.status(201).json(
        new ApiResponse(200,task,"Task assigned successfully")
    )


})


export {
    logoutUser,
    loginUser,
    registerUser,
    AddTask
}