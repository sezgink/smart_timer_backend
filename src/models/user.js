const mongoose = require('mongoose');
const {default :validator} = require('validator');

const User = mongoose.model('User',{
    email : {
        type: String,
        required : true,
        lowercase: true,
        trim : true,
        maxlength: 255,
        // unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Mail not valid");
            }
            
        }
    },
    password : {
        type: String,
        minlength: 7,
        maxlength: 255,
        required: true,
    }
});

module.exports = User;