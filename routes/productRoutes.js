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


// PUT /api/products/:id
router.put("/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(400).json({
            message: "Error updating product",
            error: error.message
        });
    }
});

// DELETE /api/products/:id
router.delete("/:id", async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(
            req.params.id
        );

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product deleted successfully"
        });

    } catch (error) {
        res.status(400).json({
            message: "Error deleting product",
            error: error.message
        });
    }
});
export default router;