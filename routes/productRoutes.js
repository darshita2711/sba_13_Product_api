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

// GET /api/products/:id
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(product);

    } catch (error) {
        res.status(400).json({
            message: "Error retrieving product",
            error: error.message
        });
    }
});