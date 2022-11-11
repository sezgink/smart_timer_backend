const bcrypt = require ('bcrypt');

const saltRaunds=10;

const LoginManager=()=>{

    this.login = (user2check,mongoManager)=>{
        user2check.saltRaunds= saltRaunds;
        
        mongoManager.CheckUser(user2check);

        
    }

    this.signUp = (newUser,mongoManager)=>{
        userdata = {};
        userdata.username = newUser.username;

        bcrypt.hash(newUser.password,saltRaunds).then((hashedPassword)=>{
            userdata.hashedPassowrd = hashedPassword;
            mongoManager.AddUser(userdata);

        }).catch((err)=>{
            console.log(err);
            return false;
        });
    }

    return this;
}

module.exports = LoginManager;

