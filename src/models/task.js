const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        posicao :{
            type: Number,
            required: true
        },
        titulo:{
            type: String,
            required: true,
        },
        descricao:{
            type: String,
            default: '',
        },
        status:{
            type: String,
            required: true,
        },
        dataEntrega:{
            type: String,
            default: null,
        },
        usuarioCriador:{
            // esse type junto com o Ref referencia as tasks para cada usuario
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        //timestamp faz com que o mongoose crie a data de criação e data de atualização automaticamente
        timestamps:true,
    }
);

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;