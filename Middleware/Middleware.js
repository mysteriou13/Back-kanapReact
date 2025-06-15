var jwt = require('jsonwebtoken');
/*decode le token du user*/
async function decodetoken(req, res, next) {
    // Vérifie que req.headers existe
    const token =  req.headers.authorization;
   

    if (!token) {
        return res.status(401).json({ message: "Token manquant" });
    }
      jwt.verify(token, process.env.secretKey, (err, decoded) => {
         console.log("decode token", decoded);
       
        // Si le token est valide, on peut ajouter les informations décodées à la requête
        req.user = decoded;
       /*passer au controller*/
        next();

    });
}

module.exports = {
    decodetoken
};