/*model user*/
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    lastname: String,
    firstName: String,
    address: String,
    zipCode: String,
    email: String,
    password: String,
    phoneNumer:Number
});

const User = model('User', UserSchema);

module.exports = { User };



