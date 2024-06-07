import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes";
import menuRoutes from "./routes/menu.routes";
import cors from 'cors';
const connectDB = require('./config/db')

const app = express();

//Connect to database
connectDB()

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors()); // Enable CORS for all routes

// routes
app.use("/", userRoutes);
app.use("/", menuRoutes);

app.listen(3007, () => {
    console.log(`Server is running on http://localhost:3007`);
});



