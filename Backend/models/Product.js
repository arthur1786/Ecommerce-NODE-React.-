const mongoose = require("mongoose");
const Category = require("./Category");

const CommentSchema = new mongoose.Schema(
  {
    text: { type: String, required: false },
    rating: { type: Number, required: false },
  },
  { timestamps: true }
);

const ProductSchema = new mongoose.Schema(
  {   
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: Buffer, required: true },
    price: { type: Number, required: true },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    animal: { type: String, required: true },
    comments: [CommentSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
