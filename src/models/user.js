const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const {default :validator} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
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

userSchema.statics.findCheck = async (email,password)=>{
    const user = await User.findOne({email});

    if(!user){
        throw new Error("Unable to login");
    }
    
    const passMatch = await bcrypt.compare(password,user.password);

    if(!passMatch){
        throw new Error("Unable to login");
    }

    return user;
}

userSchema.pre("save",async function (next){
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,10);
    }

    next();

});

const User = mongoose.model('User',userSchema);

module.exports = User;