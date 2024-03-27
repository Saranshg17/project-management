import mongoose,{Schema} from "mongoose";

const HistorySchema = new Schema({
    TaskId:{
        type: String,
        required: true,
        index:true
    },
    TaskUpdate: {
        type: [String],    // Status change "prev to current"
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
},
{
    timestamps: true
})

export const history = mongoose.model("history",HistorySchema)