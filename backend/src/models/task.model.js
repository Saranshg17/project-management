import mongoose,{Schema} from "mongoose";


const KeyValueSchema = new Schema({
    key: {
        type: String,
        required: true
    },
    value: {
        type: Schema.Types.Mixed, // Allows any type of value
        required: true
    }
})

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
    },
    Custom: {
        type: [KeyValueSchema]
    }
},
{
    timestamps: true
})

export const tasks = mongoose.model("tasks",TaskSchema)