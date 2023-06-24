const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const categoryRoute = require("./routes/category");
const imageRoute = require("./routes/image")
const cors = require("cors");

// Declara uma função para o arquivo .env
dotenv.config();

// Inicia a conexão com o Database Deployment.
mongoose
  .connect(process.env.mongoConnector)
  .then(() => console.log("DbConnected"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

// Habilita o CORS para todas as solicitações
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/images", imageRoute)

// express JS para função de callback - Rodar log no console de conexão de mensagem
app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running at port 5000");
});
