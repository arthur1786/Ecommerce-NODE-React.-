const Product = require("../models/Product");
const User = require("../models/Product");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const CryptoJS = require("crypto-js")


const router = require("express").Router();

//Criar Produto
router.post("/", verifyTokenAndAdmin, async (req,res)=>{
    const newProduct = new Product(req.body)

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct)
    } catch (err) {
        res.status(500).json(err)
    }
})

//Atualizar Produto por ID
router.put("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new:true})
        res.status(200).json(updatedProduct)
    }catch(err){
        res.status(500).json(err);
    }
})

//Deleta produto por ID
router.delete("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Produto deletado")
    } catch (err) {
        res.status(500).json(err)
    }
})

//Lista produtos por ID
router.get("/find/:id", verifyTokenAndAdmin, async (req,res)=>{
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err)
    }
})

//Lista todos os produtos
router.get("/",async (req,res)=>{
    try {
        const product = await Product.find()
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err)
    }
}) 

module.exports = router;