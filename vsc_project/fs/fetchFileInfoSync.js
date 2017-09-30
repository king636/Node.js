'use strict'

var fs = require('fs');
var stat = fs.statSync('output.txt');
if(stat){
    //是否是文件
    console.log('is file ? ' + stat.isFile());
    //是否是目录
    console.log('is directory ? ' + stat.isDirectory());
    if(stat.isFile()){
        //文件大小
        console.log('file size: ' + stat.size);
        //文件创建时间
        console.log('file birth time: ' + stat.birthtime);
        //文件修改时间
        console.log('file modify time: ' + stat.mtime);
    }
}