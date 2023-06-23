const Order = require("../models/Order");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const router = require("express").Router();

// Efetuar pedido
router.post("/", verifyToken, async (req, res) => {
    try {
      const { code, totalAmount, products, customer, orderDate, status } = req.body;
      const order = new Order({
        code,
        totalAmount,
        products,
        customer,
        orderDate,
        status
      });
      const savedOrder = await order.save();
      res.status(201).json(savedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // Editar status do pedido
  router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // Retornar pedido por cliente -- Consultar CustomerID no MongoDB
  router.get("/:customerId", verifyTokenAndAdmin, async (req, res) => {
    try {
      const { customerId } = req.params;
      const orders = await Order.find({ customer: customerId });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // Retornar lista de pedidos completa
  router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;