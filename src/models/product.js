const mongoose = require('mongoose');
const validator = require('validator');

const schema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, 'Please enter de product name']
        },
        quantity:{
            type: Number,
            required: true,
            default: 0
        },
        price:{
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: false
        }
    },
    {
        timestamps:true 
    }
)

const Product = mongoose.model('Product', schema);

module.exports = Product;