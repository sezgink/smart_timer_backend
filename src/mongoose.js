const mongoose = require('mongoose');
const databaseUser=process.env.DBUSER;
const databasePassword=process.env.DBPASSWORD;
const databaseCluster=process.env.DBCLUSTER;
const databaseName = "timer";
const uri = "mongodb+srv://"+databaseUser+":"+databasePassword+"@"+databaseCluster+"/"+databaseName+"?retryWrites=true&w=majority";

// console.log(uri)
mongoose.connect(uri,{
    useNewUrlParser:true,
    autoIndex:true
});

