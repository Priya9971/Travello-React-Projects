const express = require('express');
const Category = require("../model/category.model");
const categories = require("../data/categories");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        await Category.deleteMany({});

        // Insert your static categories.json data
        const categoriesInDB = await Category.insertMany(categories.data);

        res.json({
            message: "Categories imported successfully",
            data: categoriesInDB
        });
    } catch (err) {
        console.error("Insert Error:", err.message);
        res.status(500).json({
            message: "Could not add categories to DB",
            error: err.message
        });
    }
});

module.exports = router;