const S = require('string')

function handleError(res, err){
    // Entrar qnd o mongoose der algum erro
    if(String(err).includes("ValidationError: ")){
        return res.status(400).json({
            status: "Error",
            statusMessage: S(String(err).replace("ValidationError: ", "")).replaceAll(":", "").s,
        });
    }
    // pode ser qqr erro, até os definidos manualmente
    if(String(err).includes("Error:")){
        return res.status(400).json({
            status: "Error",
            statusMessage: String(err).replace("Error: ", ""),
        });
    }
    //Erro inesperado
    console.log(err);
    return res.status(500).json({
        status: "Error",
        statusMessage: "Houve um erro inesperado, tente novamente mais tarde.",
    })
}

module.exports = handleError