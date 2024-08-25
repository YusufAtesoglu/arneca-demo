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

// Tüm ürünleri getirme (Read - All)
router.get("/", async (req, res) => {
  try {
    const { query, category, activity, brand, gender, sizes,colors } = req.query;
    let filter = {};

    // Arama sorgusu varsa
    if (query) {
      filter.name = { $regex: query, $options: "i" }; // İsimde arama yap
    }

    // Kategori filtrelemesi
    if (category) {
      const selectedCategories = category.split(",");
      const activityFilters = selectedCategories.filter(cat => isNaN(cat)); // NaN olanları seçiyoruz (activity)
      const priceFilters = selectedCategories.filter(cat => !isNaN(cat));  // NaN olmayanları seçiyoruz (price)
      const brandFilters = selectedCategories.filter(cat => isNaN(cat)); // NaN olanları seçiyoruz (brand)
      const genderFilters = selectedCategories.filter(cat => isNaN(cat)); // NaN olanları seçiyoruz (gender)
      const colorFilters = selectedCategories.filter(cat => isNaN(cat)); // NaN olanları seçiyoruz (color)

      // Activity filtrelemesi için $or koşulu
      if (activityFilters.length > 0) {
        filter.$or = activityFilters.map(activity => ({ activity }));
      }

      // Brand filtrelemesi
      if (brandFilters.length > 0) {
        filter.$or = brandFilters.map(brand => ({ brand }));
      }
        // color filtrelemesi
        if (colorFilters.length > 0) {
          filter.$or = colorFilters.map(color => ({ color }));
        }

      // Gender filtrelemesi
      if (genderFilters.length > 0) {
        filter.$or = genderFilters.map(gender => ({ gender }));
      }

      // Price filtrelemesi
      if (priceFilters.length > 0) {
        filter.price = { $in: priceFilters };
      }
    }

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
