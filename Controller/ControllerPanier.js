
const {ItemPanier} = require("../Model/ModelPanier")
const jwt = require("jsonwebtoken")

/*add item in basket*/
const InsertBasket = async (req, res) => {
  try {
    // Récupérer le token depuis l'en-tête HTTP
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Token manquant" });
    }

    const token = authHeader.split(" ")[1]; // "Bearer <token>"
    const logindecode = jwt.verify(token, "shhhhh"); // à adapter selon ton payload
    console.log("/login decode", logindecode);

    // Extraire les données sans forcer _id
    const { _id, login, ...itemWithoutId } = req.body.item;

    const NewItem = new ItemPanier({
      ...itemWithoutId,
      login: logindecode.email, // ou logindecode.id, selon ton JWT
    });

    await NewItem.save();

    res.status(200).json({ message: "produit ajouté au panier" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};




module.exports = {InsertBasket}