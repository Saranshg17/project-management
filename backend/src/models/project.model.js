import mongoose,{Schema} from "mongoose";

const ProjectSchema = new Schema({
    Name:{
        type: String,
        required: true,
        index:true
    },
    Description: {
        type: String,
        required: true
    },
    Tasks: {
        type:[String]
    }
})


export const projects = mongoose.model("projects",ProjectSchema)