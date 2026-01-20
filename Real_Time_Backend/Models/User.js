const mongoose = require("mongoose");

const User = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
            trim : true
        },
        
        email : {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
        },
        password: {
            type: String,
            required: true
        },
         isOnline: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps : false
    }
);

module.exports = mongoose.model("User" , User);