/*controllerUser*/

const bcrypt = require("bcrypt");
const { User }  = require("../Model/ModelUser");
 async function postInscription(req, res) {
    console.log("inscription controller",req.body);
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

 /*verif si le user dans la base de  donner*/
    let datauser = await User.findOne({ email: req.body.email }).exec();
    
    console.log("datauser", datauser);

    if(datauser) {
        console.log("user already exist");
        return res.status(400).json({ message: "User already exists" });
    }else{
        console.log("user not exist, create user");
        const newUser = new User({
           ...req.body,
                password: hash 
            });

        try {
            await newUser.save();
            console.log("User created successfully");
            return res.status(201).json({ message: "User created successfully" });
        } catch (error) {
            console.error("Error creating user:", error);
            return res.status(500).json({ message: "Internal server error" });
        }

        
 }
 
 }
 
module.exports = { postInscription };