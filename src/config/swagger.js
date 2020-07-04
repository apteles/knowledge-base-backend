import path from 'path';

export default {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Knowledge Base API',
      description:
        'Provide a Knowledge base to store articles about tecnologies e anything else',
      contact: {
        name: 'André Teles',
        email: 'andre.telestp@gmail.com',
      },
      servers: ['http://localhost:3333'],
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: [path.join(__dirname, '..', 'app', 'routes.js')],
};
