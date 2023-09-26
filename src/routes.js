function routes(app){
    app.use('/user',require('./routes/user.js'));
    return
}

module.exports = routes;