const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ConectToDB = require('../middlewares/ConnectDB');
const handleError = require('../functions/handleError');
const User = require('../models/user');
const router = express.Router();

/* GET users listing. */
router.post('/create', ConectToDB, async function(req, res) {
  try {
    //#swagger.tags = ["Usuário"]
    let {nome, email, senha} = req.body;
    const criptHash = 11;
    const criptPass = await bcrypt.hash(senha, criptHash);
    const resBD = await User.create({nome, email, senha: criptPass})

    res.status(200).json({
      status: "Okay",
      statusMessage: "O usuário foi criado com sucesso.",
      menssage: resBD,
    })

  } catch (error) {
    if(String(error).includes("email_1 dup key")){
      return handleError(res, "Error: já existe um usuário com este e-mail")
    }
    return handleError(res,error);
  }
});

router.post('/login', ConectToDB, async function(req, res) {
  try {
    //#swagger.tags = ["Usuário"]
    let { email, senha} = req.body;

    let resBD = await User.findOne({email}).select('+senha')
    if(resBD) {

      let Pass = await bcrypt.compare(senha, resBD.senha);
      if(Pass){
        let token = jwt.sign({id: resBD._id}, process.env.JWT_SECRET, {expiresIn: '1d'});

        res.header('x-auth-token', token);

        res.status(200).json({
          status: "Okay",
          statusMessage: "O usuário foi autenticado com sucesso.",
          menssage: {'x-auth-token': token},
        });

      }else{
        throw new Error("Email ou Senha Inválidos");
      }
    }else{
      throw new Error("Email ou Senha Inválidos");
    }

  } catch (error) {
    return handleError(res,error);
  }
});

module.exports = router;
