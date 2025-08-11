const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts, Tasks, Menu, Orders, Users & Payments API',
    description: 'API for managing contacts, tasks, food menu, and orders with CRUD operations.',
  },
  host: 'cse-341-project1-0cop.onrender.com', // Change to Render domain before upload
  schemes: ['https'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
