const { Products } = require("../Model/ModelProduct");

const readProduct = async (req, res) => {
    try {
        const products = await Products.find().exec();
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des produits" });
    }
};


const readOneproduct = async(req, res) =>{
    console.log("one product",req.params)
     
    let data = Products.findOne({_id:req.params.id}).exec();

     data = await data;

    console.log("data",data);

    res.status(200).json({data:data})


}

module.exports = { readProduct,readOneproduct };