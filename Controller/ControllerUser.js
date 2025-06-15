/*controllerUser*/

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { User }  = require("../Model/ModelUser");


/*inscription user*/
 async function postInscription(req, res) {
    console.log("inscription controller",req.body);
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

 /*verif si le user dans la base de  donner*/
    let datauser = await User.findOne({ email: req.body.email }).exec();
    if(datauser) {
    
        return res.status(200).json({ status:false, message: "email existe déja" });
    }else{

        const newUser = new User({
           ...req.body,
                password: hash 
            });

        try {
            await newUser.save();
            return res.status(201).json({status:true, message: "User created successfully" });
        } catch (error) {
            console.error("Error creating user:", error);
            return res.status(500).json({ message: "Internal server error" });
        }

        
 }
 
 }

 /*connection user*/
 async function connection(req,res){
        console.log("body",req.body);
     let data = await User.findOne({email:req.body.email}).exec();
        if(data){
         
         let pass = bcrypt.compareSync(req.body.password, data.password);
         
           if(pass == true){
             var token = jwt.sign({ email: data.email }, process.env.secretKey);
            return res.status(200).json({status:true,mail:true ,pass :true,token:token})
          
          }else{
             
            return res.status(200).json({status:false,mail:true ,pass :false})

           }
        }else{
          
              return res.status(200).json({status:false,mail:false, pass:false})
        }
   
 }

 /*send data user*/
 async function readatauser(req,res){
console.log("req.user",req.user.email);
let datauser = User.findOne({email:req.user.email}).exec();

/*affiche les donne user*/

    datauser = await datauser;
    //console.log("datauser",datauser);

   datauser = datauser.toObject(); // Convertir le document Mongoose en objet JavaScript
     datauser.password = undefined; // Supprimer le mot de passe
    datauser.__v = undefined; // Supprimer la version du document
    datauser._id = undefined; // Supprimer l'ID du document
if(datauser){
        console.log("datauser",datauser);
    return res.status(200).json({status:true,data:datauser});

    
}


 }
 
/*update data user*/

async function updateuser(req, res) {

    console.log("update user data body", req.body.editData.address);

    const filter = { email: "test@test.com" };
    const update = {
         ...req.body.editData // Utiliser les données de l'édition
    };

    try {
        // findOneAndUpdate prend deux arguments: le filtre et les champs à mettre à jour
        const doc = await User.findOneAndUpdate(filter, update, { new: true });

        if (!doc) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        console.log("User updated successfully");
        return res.status(200).json({ status: true, message: "User updated successfully", user: doc });

    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
}





module.exports = { postInscription,connection,readatauser,updateuser };