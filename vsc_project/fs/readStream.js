'use strict'

var encode = 'utf-8';
var fs = require('fs');

//打开流
var rs = fs.createReadStream('./vsc_project/fs/sampleRead.txt', encode);

//data事件即读取流事件，文件内容多的时候可能多次
rs.on('data',function(chunk){
    console.log('DATA');
    console.log(chunk);
});

//读取结束
rs.on('end',function(){
    console.log('END');
});

//比如文件名不存在，会走到这里
rs.on('error',function(err){
    console.log('ERROR' + err);
});