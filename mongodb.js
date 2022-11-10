const { MongoClient, ServerApiVersion } = require('mongodb');
const {GetDbCredidentals} = require('./dbConfigReader.js');

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