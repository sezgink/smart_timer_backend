const { MongoClient, ServerApiVersion } = require('mongodb');
const {GetDbCredidentals} = require('./dbConfigReader.js');
const bcrypt = require ('bcrypt');


function MongoManager(){

  this.dbCredidentals = GetDbCredidentals();
  this.databaseUser=dbCredidentals.dbUser;
  this.databasePassword=dbCredidentals.dbPassword;
  this.databaseCluster=dbCredidentals.dbCluster;
  this.uri = "mongodb+srv://"+databaseUser+":"+databasePassword+"@"+databaseCluster+"/?retryWrites=true&w=majority";
  this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

  console.log(this.dbCredidentals);

  this.db=null;

  this.client.connect().then(()=>{
    this.db =  this.client.db("timer");
  }).catch(err=>{
    return console.log("Cant connect to db"+err.cause);
  });

  this.CreateInterval=function(newInterval){

    const collection = this.db.collection("intervals");

      collection.insertOne({
      interval:newInterval.interval,
      mission: newInterval.mission
    }).then(()=>{
      console.log("Successfuly inserted");
      

      }).catch(err=>{
        console.log(err);
        
      });

  }

  this.GetIntervals=function(DateRange){

    const collection =  this.db.collection("intervals");

    collection.find({}).project({}).toArray().then((result)=>{
      console.log(result);
      

    }).catch((err)=>{
      console.log(err);
      
    });

  }

  this.AddUser=function(newUser){

    const collection =  this.db.collection("users");

    return new Promise((resolve,reject)=>{
      collection.findOne({username:newUser.username}).then((result)=>{
        // console.log(result);
        if(result!==null){
          reject("User already exists");
          return;
        }
  
        collection.insertOne({
          username:newUser.username,
          hashedPassword: newUser.hashedPassword
        }).then(()=>{
          console.log("Successfuly inserted");
          resolve(true);
    
        }).catch(err=>{
          reject(err);
          
        });
  
      }).catch((err)=>{
        reject(err);
        
      });
    })
  }

  this.CheckUser=function(user2check){

    return new Promise((resolve,reject)=>{

      const collection =  this.db.collection("users");

      collection.findOne({username:user2check.username}).then((result)=>{
      // console.log(result);
      if(result==null){
        console.log("User not exists");
        return false;
      }

      console.log(user2check);
      console.log(result);

      bcrypt.compare(user2check.password,result.hashedPassword).then((passwordsMatched)=>{
        resolve(passwordsMatched);
      }).catch((err)=>{
        console.log(err);
        reject(err);
        return false;
      });
      }).catch((err)=>{
        console.log(err);
        reject(err);
      });

    });
    

  }


  return this;
}

// CreateInterval({interval:200,mission:"Fun"});

module.exports = MongoManager;

/*
client.connect(err => {
    if(err){
        return console.log("Cant connect to db"+err.cause);
    }
  const db = client.db("timer");
  const collection = db.collection("intervals");

  // collection.insertOne({
  //   interval:100,
  //   mission: "TimerBackend"
  // });
  // perform actions on the collection object
  client.close();
});

const ConnectAndUse = (onConnect)=>{
  client.connect(err => {
    if(err){
        return console.log("Cant connect to db"+err.cause);
    }
  const db = client.db("timer");
  const collection = db.collection("intervals");

  onConnect(collection);

  // client.close();
});
}
*/