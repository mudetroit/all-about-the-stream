require("babel/register");

var fs = require('fs');
var taskDir= './src/infrastructure/build/tasks/';
var taskFiles = fs.readdirSync(taskDir);

taskFiles.forEach(function(taskFile){
    require(taskDir + taskFile);
});