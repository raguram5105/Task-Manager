import express from "express";
import { signup, signin } from "../Controller/userController.js";

const userrouter = express.Router();

userrouter.post("/signup", signup);
userrouter.post("/signin", signin);

export default userrouter;