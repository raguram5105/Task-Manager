import {User} from "../models/User.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
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
        res.status(200).json({message: "Logged in successfully"});

    } catch (err) {
        res.status(500).json({message: err.message});
    }
};
