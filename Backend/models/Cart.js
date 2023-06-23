const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    totalAmount: { type: Number, required: true },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, default: 1 },
      }
    ],
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    orderDate: { type: Date, required: true },
    status: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
