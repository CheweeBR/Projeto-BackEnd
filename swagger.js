const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swaggerDocs.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles);