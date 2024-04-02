import mongoose,{Schema} from "mongoose";

const TaskSchema = new Schema({
    Name:{
        type: String,
        required: true,
        index:true
    },
    Description: {
        type: String,
        required: true
    },
    Status: {
        type: String,    // Complete, In Progress, Done
        required: true
    },
    Assigned_to: {
        type: String,   //ID of Employee to which this task is assigned
        required: true
    },
    Assigned_by: {
        type: String,   //ID of Employee who assigned task
        required: true
    },
    Category:{
        type: String,   // HR, Finance, IT, Resourcing
        required: true
    },
    Comment:{
        type: String
    }
},
{
    timestamps: true
})

export const tasks = mongoose.model("tasks",TaskSchema)