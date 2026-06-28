import { Task } from "../Models/Task.js";

export const addTask = async (req,res) => {
    try{
        const {taskName, description} = req.body;
        const userId=req.user.id;
        if(!userId || !taskName){
            return res.status(400).json("Feild missing");
        }
        const task = await Task.create({userId, taskName, description});
        return res.status(201).json("Task added successfully");
    }catch(err){
        return res.status(500).json({message : err.message});
    }
};

export const delTask = async (req,res) => {
    try{
        const {id} = req.params;
        const userId=req.user.id;
        const data= await Task.findOneAndDelete({_id:id,userId:userId});
        if(!data){
            return res.status(400).json("No Task found to be deleted");
        }
        return res.status(200).json("Task successfully deleted");
    }catch(err){
        return res.status(500).json({message : err.message})
    }
};

export const getTasks = async (req,res) =>{
    try{
        const userId=req.user.id;
        const tasks= await Task.find({userId});
        return res.status(200).json(tasks);
    }catch(err){
        return res.status(500).json({message: err.message});
    }
};

export const uptask = async (req,res)=>{
    try{
        const {id} =req.params;
        const userId=req.user.id;
        const { taskName,description} = req.body;
        if(!taskName){
            return res.status(400).json({message: "Task name is missing"});
        }
        const task=await Task.findOneAndUpdate({_id:id,userId},{taskName,description},{returnDocument: "after"});
        if(!task){
            return res.status(404).json({message: "Task not found"});
        }
        return res.status(200).json({message: "Task updated successfully",task});
    }catch(err){
        return res.status(500).json({message: err.message});
    }
};

export const toggletask = async (req,res)=>{
    try{
        const {id}=req.params;
        const userId=req.user.id;
        const task=await Task.findOne({_id:id, userId});
        if(!task){
            return res.status(404).json({message:"Task not found"});
        }
        const updatedTask = await Task.findOneAndUpdate({_id:id,userId},{completed: !task.completed},{returnDocument: "after"});
        return res.status(200).json({message :"Task status updated successfully",task:updatedTask});

    }catch(err){
        return res.status(500).json({message: err.message});
    }
};