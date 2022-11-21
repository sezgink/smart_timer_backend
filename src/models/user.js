const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const {default :validator} = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    email : {
        type: String,
        required : true,
        lowercase: true,
        trim : true,
        maxlength: 255,
        unique: true,
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
    },
    tokens : [{
        token : {
            type : String,
            required : true
        }
    }]
});

//Create JSON Web Token for autharize users
userSchema.methods.CreateAuthToken = async function(){
    const user=this;

    const token = jwt.sign({id:user._id.toString()},'temporaryKey');

    user.tokens.concat({token});
}

//Find email and check matching password with hash for login
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

//Hash plain password on password updates
userSchema.pre("save",async function (next){
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,10);
    }

    next();

});

const User = mongoose.model('User',userSchema);

module.exports = User;