const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const router = express.Router();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node.js Express API with Swagger',
      version: '1.0.0',
      description: 'This is a simple RESTful API documentation using Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server',
      },
    ],
  },
  apis: ['./server.js'], // Path to the API routes
};

const specs = swaggerJsdoc(options);
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(specs));

module.exports = router;
