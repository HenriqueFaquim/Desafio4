const jwt = require('jsonwebtoken')
const handleError = require('../functions/handleError');

async function AuthUser(req,res,next) {
    const token = req.headers['x-auth-token'];

    if(!token){
        return handleError(res, new Error('Token de autenticação não fornecido!'));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userJwt = decoded;

        next();

    } catch (error) {
        console.error(error);

        return handleError(res, new Error('Token de autenticação inválido!'))
    }


}
module.exports = AuthUser;