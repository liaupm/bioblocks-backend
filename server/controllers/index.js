/*Method to export files automatically*/ 
var fs=require('fs');
var path= require('path');

var files = fs.readdirSync(__dirname); 

files.forEach((file) =>{
    var fileName =path.basename(file,'.js');
    
    if(fileName !=="index"){
        exports[fileName]=require("./" + fileName);
    }
});