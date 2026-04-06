const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DTS API',
      version: '1.0.0',
      description: 'Documents Tracker System API',
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

module.exports = swaggerJsdoc(options);
