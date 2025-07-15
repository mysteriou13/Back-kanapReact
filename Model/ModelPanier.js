const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ItemPanierSchema  = new Schema({
  
colors: {
    type: [String],      
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  login:{
    type:String,
    require:true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  altTxt: {
    type: String,
    required: true,
  },
  listeColor: {
    type: [String],      // tableau de chaînes
    required: false,
  },
  color: {
    type: String,
    required: false,
  },
  
nbkananp: {
    type: Number,
    required: false,

  },

})


const ItemPanier = mongoose.model("Panier",ItemPanierSchema)

module.exports  = { ItemPanier }