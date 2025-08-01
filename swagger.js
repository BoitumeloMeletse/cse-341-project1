const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts & Tasks API',
    description: 'API for managing contact and task data including CRUD operations.',
  },
  host: 'cse-341-project1-0cop.onrender.com', // Change to Render domain before upload
  schemes: ['http', 'https'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
