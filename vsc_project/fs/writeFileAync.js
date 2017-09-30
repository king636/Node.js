'use strict'

var fs = require('fs');
var data = 'nodejs aync';
//output.txt会被写到根目录下
fs.writeFile('output.txt',data,function(err){
    if(err){
        console.log(err);
    }else{
        console.log('write successfully!');
    }
});