import {User} from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({message: "Field missing"});
        }
        const data = await User.findOne({ email });
        if (!data) {
            return res.status(400).json({message: "User not found"});
        }
        const isMatch = await bcrypt.compare(password,data.password);
        if (!isMatch) {
            return res.status(400).json({message: "Incorrect password"});
        }
        const token=jwt.sign({id:data._id},process.env.JWT_SECRET,{expiresIn:"30m"});
        res.status(200).json({message: "Logged in successfully"},token);

    } catch (err) {
        res.status(500).json({message: err.message});
    }
};
