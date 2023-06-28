const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mi API',
      version: '1.0.0',
      description: 'Documentación de mi API',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Reemplaza con la URL base de tu API
      },
    ],
  },
  apis: ['./server.js'], // Reemplaza con la ruta a tus archivos de rutas
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};