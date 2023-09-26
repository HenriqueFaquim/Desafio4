const mongooseToSwagger = require('mongoose-to-swagger');
const User = require('../src/models/user.js');
const Task = require('../src/models/task.js');
const swaggerAutogen = require('swagger-autogen')({
    openapi: '3.0.0',
    language: 'pt-BR',
});

const outputFile = './swagger_output.json';
const endpointFiles = ["../index.js", '../src/routes.js']

let doc = {
    info: {
        version: "1.0.0",
        title: "API do BoardTasks",
        description: "Documentação da API do BoardTasks."
    },
    servers: [
        {
            url: "http://localhost:3000/",
            description: "Servidor localhost."
        },
        {
            url: "https://desafio4-2s4178f5b-henriquefaquim.vercel.app/",
            description: "Servidor de produção."
        }
    ],
    consumes: ['application/json'],
    produces: ['application/json'],
    components:{
        schemas:{
            User: mongooseToSwagger(User),
            Task: mongooseToSwagger(Task),
        }
    }
}

swaggerAutogen(outputFile, endpointFiles, doc).then(() => {
    console.log("Documentação do Swagger gerada encontra-se no arquivo em: " + outputFile);
    if (process.env.NODE_ENV !== 'production') {
        require("../index.js");
    }
})