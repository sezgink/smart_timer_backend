const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const {default :validator} = require('validator');

const intervalSchema = new Schema({
    intervalLength  : {
        type : Number,
        required: true
    },
    task : {
        type : String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, 
{ //Settings
    timestamps : {
        createdAt : true,
        updatedAt : false
    }
}
);

var groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

var groupByInGroups = async function(xs, key) {
    return await xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };



var groupByDays = async function(xs, key) {
    return await xs.reduce(function(rv, x) {
      (rv[x[key].getUTCDate()] = rv[x[key].getUTCDate()] || []).push(x);
    //   (rv[x[key].getDay()] = rv[x[key].getDay()] || []).push(x);
      return rv;
    }, {});
  };

  

intervalSchema.statics.GetDailyWorks = async (beginDate, endDate,owner)=>{
    try {
      const intervalsBetween = await Interval.find({owner, createdAt: { $gte: beginDate, $lte : endDate}});
      // const groupedByDay = groupBy(intervalsBetween,created);
      const groupedByDays = await groupByDays(intervalsBetween,"createdAt");
      const groupedByTask = await Object.values(groupedByDays).map((dailyValues)=>{
          return groupBy(dailyValues,"task");
      });

      const dailyObjectArray = Object.values(groupedByDays);

      const dailySeconds =  await dailyObjectArray.map((dailyObject)=>{
          const sumPerArray = dailyObject.reduce((sum,x,)=>sum+x.intervalLength,0);
          return sumPerArray; 
      });

      // console.log(groupedByTask);
      return dailySeconds;
    }
    catch(e){
        throw new Error(e);
    }
}

intervalSchema.statics.GetDailyWorksWithTasks = async (beginDate, endDate,owner)=>{
    try {
    const intervalsBetween = await Interval.find({owner, createdAt: { $gte: beginDate, $lte : endDate}});
    // const groupedByDay = groupBy(intervalsBetween,created);
    const groupedByDays = await groupByDays(intervalsBetween,"createdAt");
    const groupedByTask = await Object.values(groupedByDays).map((dailyValues)=>{
        return groupBy(dailyValues,"task");
    });

    const dailySeconds =  groupedByTask.map((dailyObject)=>{
        const keysArray = Object.keys(dailyObject);
        keysArray.forEach(keyTask => {
            dailyObject[keyTask] = dailyObject[keyTask].reduce((rv,x)=>{
              return rv + x.intervalLength;
            },0);
          
        });
        
        return dailyObject; 
    });
    
    // console.log(groupedByTask);
    return dailySeconds;
    }
    catch(e){
        throw new Error(e);
    }
}

const Interval = mongoose.model('Interval',intervalSchema);

module.exports = Interval;