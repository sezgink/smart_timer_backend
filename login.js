const bcrypt = require ('bcrypt');

const saltRaunds=10;

const LoginManager=()=>{

    this.login = (user2check,mongoManager)=>{
        user2check.saltRaunds= saltRaunds;
        
        mongoManager.CheckUser(user2check).then((checkResult)=>{
            console.log(checkResult);
        });


    }

    this.signUp = (newUser,mongoManager)=>{
        userdata = {};
        userdata.username = newUser.username;

        bcrypt.hash(newUser.password,saltRaunds).then((hashedPassword)=>{
            userdata.hashedPassword = hashedPassword;
            mongoManager.AddUser(userdata);

        }).catch((err)=>{
            console.log(err);
            return false;
        });
    }

    return this;
}

module.exports = LoginManager;

