const mongoose = require('mongoose');
const handleError = require('../functions/handleError');

async function ConectToDB(req = null, res = null, next = null) {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log('Connected to MongoDB!')
        try{next();} catch {};
        return mongoose;
    } catch (error) {
        console.error(error);
        handleError(res, 'Error: Erro ao conectar ao banco de dados.');
        return error;
    }
}

module.exports = ConectToDB;