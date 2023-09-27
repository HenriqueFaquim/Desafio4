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

router.get('/read', AuthUser, ConectToDB, async function(req, res) {
  try {
    //#swagger.tags = ["Tarefa"]
    // #swagger.description = "Endpoint para obter todas as tarefas do usuario logado."
    const usuarioLogado = req.userJwt.id;
    const resBD = await Task.find({usuarioCriador: usuarioLogado}).populate("usuarioCriador");

    res.status(200).json({
      status: "Okay",
      statusMessage: "Seguem as listas de tarefa.",
      menssage: resBD,
    })

  } catch (error) {
    return handleError(res,error);
  }
});

router.put('/update/:id', AuthUser, ConectToDB, async function(req, res) {
  try {
    //#swagger.tags = ["Tarefa"]
    let idTask = req.params.id
    let {posicao, titulo, descricao, status, dataEntrega} = req.body;
    const usuarioLogado = req.userJwt.id;

    const task = await Task.findOne({_id: idTask, usuarioCriador: usuarioLogado});
    if(!task){
      throw new Error("Tarefa não encontrada!");
    }

    const respDB = await Task.updateOne({_id: idTask}, {posicao, titulo, descricao, status, dataEntrega});
    if(respDB?.modifiedCount>0){
    const newTask = await Task.findOne({_id: idTask}).populate('usuarioCriador');
    res.status(200).json({
      status: "Okay",
      statusMessage: "A tarefa foi atualizada com sucesso.",
      menssage: newTask,
  })
    
  }
  } catch (error) {
    return handleError(res,error);
  }
});

router.delete('/delete/:id', AuthUser, ConectToDB, async function(req, res) {
  try {
    //#swagger.tags = ["Tarefa"]
    let idTask = req.params.id
    const usuarioLogado = req.userJwt.id;
    const task = await Task.findOne({_id: idTask, usuarioCriador: usuarioLogado}).populate('usuarioCriador');
    if(!task){
      throw new Error("Tarefa não encontrada!");
    }
    const respDB = await Task.deleteOne({_id: idTask});
    res.status(200).json({
      status: "Okay",
      statusMessage: "A tarefa foi Deletada com sucesso.",
      menssage: task,
    })

  } catch (error) {
    return handleError(res,error);
  }
});


module.exports = router;
