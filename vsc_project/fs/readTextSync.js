'use strict'

var fs = require('fs');

// var data = fs.readFileSync('sample.txt','utf-8');//文件找不到,fs异常,需要用下面的写法捕获异常
try{
    // var data = fs.readFileSync('sample.txt','utf-8');//文件找不到，抛出异常
    var data = fs.readFileSync('./vsc_project/fs/sample.txt','utf-8');
    console.log(data);
}catch(err){
    console.log(err);
}

// //注意文件路径的写法，已验证直接用'sample.txt'会找根目录的文件，而非当前目录
// fs.readFile('./vsc_project/fs/sample.txt','utf-8',function(err,data){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(data);
//     }
// })