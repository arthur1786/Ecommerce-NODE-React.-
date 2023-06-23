const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Cadastrar categoria
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = new Category({ name, description });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Editar categoria
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const category = await Category.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    if (!category) {
      return res.status(404).json('Categoria não encontrada');
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Retornar lista de categoria completa
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Retornar categoria por código
router.get('/:id', async (req, res) => {
  try {
    const { code } = req.params;
    const category = await Category.findOne({ code });
    if (!category) {
      return res.status(404).json('Categoria não encontrada');
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
