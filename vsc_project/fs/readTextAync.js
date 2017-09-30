'use strict'

var fs = require('fs');
//注意文件路径的写法，已验证直接用'sample.txt'会找根目录的文件，而非当前目录
fs.readFile('./vsc_project/fs/sample.txt','utf-8',function(err,data){
    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
})