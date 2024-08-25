const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, required: true },
    activity: { type: String, required: true },
    brand: { type: String, required: true },
    img: [{ type: String, required: true }],
    colors: [{ type: String, required: true }],
    sizes: [{ type: Number, required: true }],
    price: { type: Number, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;