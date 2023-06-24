const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Api backend Node ecommerce petshop',
      version: '1.0.0',
      description: 'Nao tem descricao pq é teste',
    },
  },
  apis: ['./routes/*.js'], // Caminho para os arquivos que contêm as rotas da API
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(5000, () => {
  console.log('Servidor iniciado na porta 3000');
});
