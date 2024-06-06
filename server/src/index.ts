import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes";
import menuRoutes from "./routes/menu.routes";
import cors from 'cors';

const app = express();



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

mongoose.connect(
    "mongodb+srv://dianaroseguinanas:dianaroseguinanas@cluster0.hhqfg3z.mongodb.net/foodorder?retryWrites=true&w=majority&appName=Cluster0"
)
    .then(() => {
        console.log("Connected to database!");

        app.get('/', (req, res) => {
            res.send("Hello from Node API Server Updated");
        })
    })
    .catch(() => {
        console.log("Connection failed!");
    });

