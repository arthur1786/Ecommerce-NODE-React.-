const Product = require("../models/Product");
const User = require("../models/Product");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const CryptoJS = require("crypto-js");
const fs = require("fs");
const multer = require("multer");
const zlib = require('zlib');


const router = require("express").Router();

// Configuração do Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Diretório onde os arquivos serão salvos
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Nome do arquivo original
  },
});

const upload = multer({ storage: storage });

// Criar Produto
router.post("/", verifyToken, upload.single("img"), async (req, res) => {
    const { code, name, description, price, categories, animal, comments } = req.body;
  
    // Verificar se a imagem foi enviada no corpo da solicitação
    if (!req.file) {
      return res.status(400).json({ message: "A imagem do produto é obrigatória." });
    }
  
    try {
      // Ler o conteúdo da imagem do arquivo enviado
      const imgData = fs.readFileSync(req.file.path);
  
      // Converter a imagem para uma string base64
      const imgBase64 = imgData.toString("base64");
  
      // Criar um novo objeto Product com os dados
      const newProduct = new Product({
        code,
        name,
        description,
        img: imgBase64,
        price,
        categories,
        animal,
        comments,
      });
  
      // Salvar o produto no banco de dados
      const savedProduct = await newProduct.save();
  
      // Remover o arquivo temporário da imagem
      fs.unlinkSync(req.file.path);
  
      res.status(200).json(savedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  });

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