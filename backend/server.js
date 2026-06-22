import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./Routes/userRoutes.js";
import cors from "cors";


dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`The server is running in port : ${PORT}`);
});