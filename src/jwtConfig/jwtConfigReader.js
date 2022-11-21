const fs = require('fs');
  
function GetJWTData(){
    // Calling the readFileSync() method
    // to read 'input.txt' file
    const dbData = fs.readFileSync('./src/jwtConfig/jwtConfig.txt',
    {encoding:'utf8', flag:'r'});

    
    const lines = dbData.split('\n');
    // lines[0] = lines[0] .replace("\r","");
    for(i=0;i<lines.length;i++){
        lines[i] = lines[i] .replace("\r","");
    }

    return {jwtKey : lines[0]};

    
}

module.exports = {GetJWTData};

