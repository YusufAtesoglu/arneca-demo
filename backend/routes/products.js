const express = require("express");
const router = express.Router();
const Product = require("../models/Product.js");

// Yeni bir ürün oluşturma (Create)
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
  }
});

// Tüm ürünleri filtreleme getirme (Read - All)
router.get("/", async (req, res) => {
  try {
    const { query,  activity, brand, gender, sizes, colors } =
      req.query;
    let filter = {};

    // Arama sorgusu varsa
    if (query) {
      filter.name = { $regex: query, $options: "i" }; // İsimde arama yap
    }

    // Kategori filtrelemesi
    // if (category) {
    //   const selectedCategories = category.split(",");
    // }

    // Activity filtrelemesi
    if (activity) {
      const selectedActivities = activity.split(",");
      filter.activity = { $in: selectedActivities };
    }

    // Brand filtrelemesi
    if (brand) {
      const selectedBrands = brand.split(",");
      filter.brand = { $in: selectedBrands };
    }

    // Gender filtrelemesi
    if (gender) {
      const selectedGenders = gender.split(",");
      filter.gender = { $in: selectedGenders };
    }

    // Size filtrelemesi
    if (sizes) {
      const selectedSizes = sizes.split(",");
      filter.sizes = { $elemMatch: { $in: selectedSizes } };
    } // colors filtrelemesi
    if (colors) {
      const selectedColors = colors.split(",");
      filter.colors = { $elemMatch: { $in: selectedColors } };
    }

    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Belirli bir ürünü getirme (Read - Single)
router.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
