const User = require("../models/User");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const CryptoJS = require("crypto-js")


const router = require("express").Router();

router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { creditCardNumber, creditCardName, cvc, expirationDate } = req.body;
  
      // Verificar se o usuário existe
      const existingUser = await User.findById(id);
      if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Atualizar as informações adicionais do usuário
      existingUser.creditCardNumber = creditCardNumber;
      existingUser.creditCardName = creditCardName;
      existingUser.cvc = cvc;
      existingUser.expirationDate = expirationDate;
  
      // Verificar se a imagem de perfil foi fornecida
      if (req.body.profilePhoto) {
        // Converter a imagem base64 em buffer
        const profilePhotoBuffer = Buffer.from(req.body.profilePhoto, 'base64');
        existingUser.profilePhoto = profilePhotoBuffer;
      }
  
      // Salvar as alterações no banco de dados
      const updatedUser = await existingUser.save();
  
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' });
    }
  });
  

//Atualiza usuário por ID
router.put("/:id", verifyTokenAndAuthorization, async (req,res)=>{
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();
    }

    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new:true})
        res.status(200).json(updatedUser)
    }catch(err){
        res.status(500).json(err);
    }
})

//Deleta usuário por ID
router.delete("/:id", verifyTokenAndAuthorization, async (req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("Usuário deletado")
    } catch (err) {
        res.status(500).json(err)
    }
})

//Lista usuário por ID
router.get("/find/:id", verifyTokenAndAdmin, async (req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        const { password, ...others } = user._doc;  
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err)
    }
})

//Lista todos os usuários
router.get("/", verifyTokenAndAdmin, async (req,res)=>{
    try {
        const users = await User.find()
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;