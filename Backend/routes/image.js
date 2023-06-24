const User = require("../models/User");
const Image = require("../models/Image");
const multer = require('multer');
const router = require("express").Router();

// Configuração do multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Define o diretório onde os arquivos serão armazenados
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      // Define o nome do arquivo no destino
      cb(null, file.originalname);
    }
  });
  
  // Cria a instância do multer
  const upload = multer({ 
    storage: storage,
    limits:{
        fileSize:5 * 1024 * 1024
    }
 });


// Cadastrar imagem
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
      // Verifica se há um arquivo enviado
      if (!req.file) {
        return res.status(400).json({ message: 'Nenhuma imagem enviada' });
      }
  
      // Cria um novo objeto de imagem com base nos dados enviados
      const newImage = new Image({
        data: req.file.buffer
      });
  
      // Salva a imagem no banco de dados
      const savedImage = await newImage.save();
  
      // Retorna a resposta com os detalhes da imagem cadastrada
      res.status(201).json(savedImage);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao cadastrar a imagem' });
    }
  });

  module.exports = router;