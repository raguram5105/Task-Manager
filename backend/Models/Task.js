import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    taskName: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    completed: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
}
);

export const Task = mongoose.model("Task", taskSchema);