'use strict'

var fs = require('fs');
//注意文件路径的写法，已验证直接用'sample.txt'会找根目录的文件，而非当前目录
//第二个参数'utf-8'这里不写的时候，data返回的是Buffer对象，字节数组
fs.readFile('./vsc_project/fs/sample.txt',function(err,data){
    if(err){
        console.log(err);
    }else{
        console.log('read file content: ');
        console.log(data);
        console.log('length: ' + data.length + ' bytes');

        //Buffer转换为String
        var text = data.toString('utf-8');
        console.log('Buffer to String: ' + text);

        //String转换为Buffer
        var buf = Buffer.from(text,'utf-8');
      //  console.log('String to Buffer: ' + buf);//这种写法，buf会被换成string打印
        console.log('String to Buffer: ');
        console.log('String to Buffer: ' + buf);
    }
})

