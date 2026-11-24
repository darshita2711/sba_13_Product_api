import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Home route
app.get("/", (req, res) => {
    res.send("Welcome to Zenith Product API!");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});