import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        default: "",
        trim: true,
    },
    priority: {
        type: String,
        enum: ["Low","Medium","High"],
        default: "Medium"
    },
    status: {
        type: String,
        enum: ["In-progress","Pending","Completed"],
        default: "Pending"
    },
    deadline: {
        type: Date,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
},{ timeStamps: true })

const taskModel = mongoose.model("Task",taskSchema)
export default taskModel