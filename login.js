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

        return new Promise((resolve,reject)=>{
            bcrypt.hash(newUser.password,saltRaunds).then((hashedPassword)=>{
                userdata.hashedPassword = hashedPassword;
                mongoManager.AddUser(userdata);
    
            }).catch((err)=>{
                reject(err);
            });

        })

        
    }

    return this;
}

module.exports = LoginManager;

