import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connection.js";


dotenv.config();

const app = express();

app.use(express.json());

// Database connection
connectDB();

// Home route
app.get("/", (req, res) => {
    res.send("Welcome to Zenith Product API!");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});