const fs = require('fs');
  
function GetDbCredidentals(){
    // Calling the readFileSync() method
    // to read 'input.txt' file
    const dbData = fs.readFileSync('./src/dbConfig/dbConfig.txt',
    {encoding:'utf8', flag:'r'});

    
    const lines = dbData.split('\n');
    // lines[0] = lines[0] .replace("\r","");
    for(i=0;i<lines.length;i++){
        lines[i] = lines[i] .replace("\r","");
    }

    const dbCredidentals = {dbUser:lines[0],dbPassword:lines[1]};

    console.log(lines);

    return {dbUser:lines[0],dbPassword:lines[1],dbCluster:lines[2]};

    
}

module.exports = {GetDbCredidentals};

