import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes";
import menuRoutes from "./routes/menuItem.routes";
import restaurantRoutes from "./routes/restaurant.routes";
import cartRoutes from "./routes/cart.routes";
import cors from 'cors';
import menuItemRoutes from "./routes/menuItem.routes";
import orderRoutes from "./routes/order.routes";
import path from 'path';

const connectDB = require('./config/db')

const app = express();

//Connect to database
connectDB()

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
    origin: 'http://localhost:3000', // Adjust this if your client runs on a different port
    optionsSuccessStatus: 200
}));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// routes
app.use("/", userRoutes);
app.use("/", menuRoutes);
app.use("/", restaurantRoutes);
app.use("/", menuItemRoutes);
app.use("/", orderRoutes);
app.use("/", cartRoutes);

app.listen(3007, () => {
    console.log(`Server is running on http://localhost:3007`);
});
