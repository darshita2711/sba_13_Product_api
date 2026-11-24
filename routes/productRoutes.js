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


// GET /api/products
router.get("/", async (req, res) => {
    try {
        const {category,minPrice,maxPrice,sortBy,page = 1,limit = 10} = req.query;

        //  Build filter object
        const filter = {};

        // Filter by category
        if (category) {
            filter.category = category;
        }

        // Filter by price range
        if (minPrice !== undefined || maxPrice !== undefined) {
            filter.price = {};

            if (minPrice !== undefined) {
                filter.price.$gte = Number(minPrice);
            }

            if (maxPrice !== undefined) {
                filter.price.$lte = Number(maxPrice);
            }
        }

        // Sorting
        let sort = {};

        if (sortBy === "price_asc") {
            sort.price = 1;
        } else if (sortBy === "price_desc") {
            sort.price = -1;
        }

        // Pagination
        const currentPage = Math.max(1, Number(page));
        const pageLimit = Math.min(100, Math.max(1, Number(limit)));
        const skip = (currentPage - 1) * pageLimit;

        // Get products from MongoDB
        const products = await Product.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(pageLimit);

        // Send response
        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({
            message: "Error retrieving products",
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