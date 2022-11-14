const bcrypt = require ('bcrypt');

const saltRaunds=10;

const LoginManager=()=>{

    this.login = (user2check,mongoManager)=>{
        user2check.saltRaunds= saltRaunds;

        return new Promise((resolve,reject)=>{
            mongoManager.CheckUser(user2check).then((checkResult)=>{
                console.log(checkResult);
                resolve(true);
            }).catch((err)=>{
                reject(err);
            });
        });
    }

    this.signUp = (newUser,mongoManager)=>{
        userdata = {};
        userdata.username = newUser.username;

        return new Promise((resolve,reject)=>{
            bcrypt.hash(newUser.password,saltRaunds).then((hashedPassword)=>{
                userdata.hashedPassword = hashedPassword;
                mongoManager.AddUser(userdata).then((result)=>{
                    resolve(result);
                }).catch((err)=>{
                    reject(err);
                });
    
            }).catch((err)=>{
                reject(err);
            });

        })

        
    }

    return this;
}

module.exports = LoginManager;

