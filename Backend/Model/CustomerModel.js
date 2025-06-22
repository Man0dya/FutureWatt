const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name:{
        type: String, 
        required:true,
    },
    password:{
        type: String, 
        required:true,
    },
    email:{
        type: String, 
        required:true,
    },
    contact:{
        type: Number, 
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    nic:{
        type: Number, 
        required:true,
    }
});

module.exports = mongoose.model(
    "CustomerModel", //file name
    customerSchema //function name
)
