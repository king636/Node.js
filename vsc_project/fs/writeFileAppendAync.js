'use strict'

var fs = require('fs');
var data = '\nappend to file';
//追加到文件尾部
fs.appendFile('output1.txt',data,function(err){
    if(err){
        console.log(err);
    }else{
        console.log('ok');
    }
})