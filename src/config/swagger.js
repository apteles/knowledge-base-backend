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
      schemas: {
        Session: {
          type: Object,
          properties: {
            email: { type: 'string', format: 'email@domain.com' },
            password: { type: 'string', format: '12a%$a#$' },
          },
        },
        SessionResponse: {
          type: Object,
          properties: {
            id: { type: 'integer', format: 1 },
            email: { type: 'string', format: 'email@domain.com' },
            password: { type: 'string', format: '12a%$a#$' },
            token: {
              type: 'string',
              format:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW4iOiI3ZCIsInN1YmplY3QiOiJhbmRyZS50ZWxlc3RwQGdtYWlsLmNvbSIsImlzc3VlciI6Imtub3dubGVkZ2UtYXBpIiwiaWF0IjoxNTkzODAyNTcyfQ.owrO88q7YDDuOFvGlDyR_if7XYh6hlyn1Lkk3IAnUXo',
            },
          },
        },
      },
    },
  },
  apis: [path.join(__dirname, '..', 'app', 'routes.js')],
};
