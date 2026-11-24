import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// POST /api/products
router.post("/", async (req, res) => {
    try {
        const newProduct = new Product(req.body);

        const savedProduct = await newProduct.save();

        res.status(201).json(savedProduct);

    } catch (error) {
        res.status(400).json({
            message: "Error creating product",
            error: error.message
        });
    }
});