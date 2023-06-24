const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER

/**
 * @swagger
 * auth/register:
 *   Post:
 *     summary: Cadastrar usuários
 *     description: cadastra usuários.
 *     responses:
 *       200:
 *         description: Usuário cadastrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  address: req.body.address,
  phone: req.body.phone,
  cpf: req.body.cpf
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN

/**
 * @swagger
 * /auth/login:
 *   Post:
 *     summary: Fazer Login
 *     description: Faz login de usuários.
 *     responses:
 *       200:
 *         description: Login.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.status(401).json("Wrong User Name");
        }

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        const inputPassword = req.body.password;

        if (originalPassword !== inputPassword) {
            return res.status(401).json("Wrong Password");
        }

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            { expiresIn: "3d" }
        );

        const { password, ...others } = user._doc;
        return res.status(200).json({ ...others, accessToken });
    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = router;