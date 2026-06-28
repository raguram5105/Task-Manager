import express from "express";
import { addTask, delTask, getTasks, toggletask, uptask } from "../Controller/taskController.js";
import { auth } from "../Middleware/auth.js";

const taskrouter = express.Router();

taskrouter.post("/addtask", auth, addTask);
taskrouter.get("/gettasks",auth,getTasks);
taskrouter.put("/uptask/:id",auth,uptask);
taskrouter.delete("/deltask/:id",auth,delTask);
taskrouter.patch("/toggle/:id",auth,toggletask)

export default taskrouter;