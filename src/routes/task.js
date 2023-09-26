const express = require('express');
const ConectToDB = require('../middlewares/ConnectDB');
const handleError = require('../functions/handleError');
const Task = require('../models/task');
const AuthUser = require('../middlewares/authUser');
const router = express.Router();

/* GET users listing. */
router.post('/create', AuthUser, ConectToDB, async function(req, res) {
  try {
    //#swagger.tags = ["Tarefa"]
    let {posicao, titulo, descricao, status, dataEntrega} = req.body;
    const usuarioCriador = req.userJwt.id;
    const resBD = await Task.create({posicao, titulo, descricao, status, dataEntrega, usuarioCriador})

    res.status(200).json({
      status: "Okay",
      statusMessage: "A tarefa foi criada com sucesso.",
      menssage: resBD,
    })

  } catch (error) {
    return handleError(res,error);
  }
});

module.exports = router;
