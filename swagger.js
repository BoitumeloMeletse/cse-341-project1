const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Users Api',
  },
  host: 'localhost:3000',
  schemes: ['http', 'https'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/index.js'];

//  this will generate the swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);