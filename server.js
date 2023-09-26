const express = require('express')
const app = express()

// importação do model do produto
const Product = require('./models/productModel')

// mongoose conecta ao banco de dados da mongoDB
const mongoose = require('mongoose')

//express.json posibilita a API entender as informaçõs via json
app.use(express.json())
// routes

app.get('/', (req, res) =>{
    res.send('Hello NODE API')
})

app.get('/blog', (req,res)=>{
    res.send('Hello Blog API')
})



// Post para gravar dados no banco de dados, se o model do produto não for importado os valores não serão gravados no mongoDB
app.post('/product', async (req, res) =>{
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product)

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//get para retornar os produtos do database
app.get('/product', async (req,res)=>{
    try {
        const products = await Product.find({});
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/product/:id', async (req,res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// fazer update
app.put('/product/:id', async (req,res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID: ${id}`})
        }
        const productafter = await Product.findById(id);
        res.status(200).json(productafter);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Deletar um produto

app.delete('/product/:id', async (req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID: ${id}`})
        }
        res.status(200).json({message: 'Product was deleted!'});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// mongoose.connect para se conectar ao banco dedados no mongoDB
mongoose.connect("mongodb+srv://admin:SqmiA6rx75gJRNf2@dbapi.v0ew7tz.mongodb.net/localhost?retryWrites=true&w=majority").then(()=>{
    console.log('connected to MongoDB')
    app.listen(3000, ()=>{
        console.log('Node is running on port 3000')
    })
}).catch((error)=>{
    console.log(error)
})