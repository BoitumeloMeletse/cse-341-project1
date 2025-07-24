const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API for managing contacts.',
  },
  host: 'https://cse-341-project1-bpcj.onrender.com', // Change to Render domain before upload
  schemes: ['http', 'https'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
