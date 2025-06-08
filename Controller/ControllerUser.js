/*controllerUser*/

const bcrypt = require("bcrypt");
const { User }  = require("../Model/ModelUser");
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

 async function connection(req,res){

     let data = await User.findOne({email:req.body.email});
        if(data){
         console.log("user trouve");
        }else{
            console.log("user inconnu");

              return res.status(200).json({status:false,errorMail:"email incorrect" })
        }
   
 }
 
module.exports = { postInscription,connection };