const { MongoClient, ServerApiVersion } = require('mongodb');
const {GetDbCredidentals} = require('./dbConfigReader.js');

var dbCredidentals = GetDbCredidentals();
var databaseUser=dbCredidentals.dbUser;
var databasePassword=dbCredidentals.dbPassword;
var databaseCluster=dbCredidentals.dbCluster;
const uri = "mongodb+srv://"+databaseUser+":"+databasePassword+"@"+databaseCluster+"/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
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
  // client.close();
});
