const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express')
const swaggerOptions = {customCssUrl: '/swagger-ui.css'}
const mongoose = require('mongoose')
const routes = require('./src/routes')
const usersRouter = require('./src/routes/users');
const authDocProducao = require('./src/middlewares/authDoc');
const app = express();
require('dotenv').config();

//configurações do Express
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// configurações do Swagger/ documentação
if(process.env.NODE_ENV !== 'test'){
    const swaggerFile = require('./swagger/swagger_output.json')
    app.get("/", (req,res) =>{/*swagger.ignore = true*/ res.redirect('/doc');});

    app.use('/doc', authDocProducao, swaggerUi.serve, swaggerUi.setup(swaggerFile,swaggerOptions));
}

//rotas da api
routes(app);

// mongoose.connect para se conectar ao banco dedados no mongoDB
mongoose.connect("mongodb+srv://admin:SqmiA6rx75gJRNf2@dbapi.v0ew7tz.mongodb.net/localhost?retryWrites=true&w=majority").then(()=>{
    console.log('connected to MongoDB')
    if (process.env.NODE_ENV !== 'test'){
        app.listen(3000, ()=>{
            console.log('Node is running on port 3000')
        })
    }
}).catch((error)=>{
    console.log(error)
})

module.exports = app;
