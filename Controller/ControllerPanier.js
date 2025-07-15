const { ItemPanier } = require("../Model/ModelPanier");
const jwt = require("jsonwebtoken");

const InsertBasket = async (req, res) => {
  try {
    // Vérifier l'en-tête Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Token manquant" });
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, "shhhhh");
    const userEmail = decodedToken.email;

    // Récupérer les données
    const { _id, login, ...item } = req.body.item;
    const { name, color, nbkananp } = item;

    // Rechercher un produit existant pour le même utilisateur et nom
    let findItem = await ItemPanier.findOne({ name,color, login: userEmail });

    if (!findItem) {
      // Créer un nouvel item
      const newItem = new ItemPanier({
        ...item,
        login: userEmail,
      });
      await newItem.save();
    } else {
      // Modifier la quantité et la couleur
      findItem.nbkananp = nbkananp+findItem.nbkananp; // ajouter la quantité ou 1 par défaut
      await findItem.save();
    }

    res.status(200).json({ message: "Produit ajouté ou modifié dans le panier" });
  } catch (error) {
    console.error("Erreur InsertBasket:", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

module.exports = { InsertBasket };
