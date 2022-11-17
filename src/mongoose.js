const mongoose = require('mongoose');
const {GetDbCredidentals} = require('./dbConfig/dbConfigReader');

const dbCredidentals = GetDbCredidentals();
const databaseUser=dbCredidentals.dbUser;
const databasePassword=dbCredidentals.dbPassword;
const databaseCluster=dbCredidentals.dbCluster;
const databaseName = "timer";
const uri = "mongodb+srv://"+databaseUser+":"+databasePassword+"@"+databaseCluster+"/"+databaseName+"?retryWrites=true&w=majority";

console.log(uri)
mongoose.connect(uri,{useNewUrlParser:true});

