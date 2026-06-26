import { Task } from "../Models/Task";

export const addTask = async (req,res) => {
    try{
        const {taskName, description} = req.body;
        const userId=req.user.id;
        if(!userId || !taskName){
            return res.status(400).json("Feild missing");
        }
        const task = await Task.create({userId, taskName, description});
        return res.status(201).json("Task added successfully",TaskController);
    }catch(err){
        return res.status(500).json({message : err.message});
    }
};

export const delTask = (req,res) => {
    try{

    }catch(err){
        return res.status(500).json({message : err.message})
    }
}