const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const productSchema = new Schema({
    _id:String,
    colors:Array,
    name:String,
    price:Number,
    imageURl:String,
    description:String,
    altTxt:String,
});

const Products = mongoose.model('Products', productSchema, 'kanapreact'); // 'kanapreact' = nom de la collection

module.exports = { Products };