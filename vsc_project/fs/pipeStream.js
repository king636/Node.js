'use strict'

var encode = 'utf-8';
var rootDir = './vsc_project/fs/'

var fs = require('fs');
var rs = fs.createReadStream(rootDir + 'sampleRead.txt', encode);

var ws = fs.createWriteStream(rootDir + 'pipeStream.txt', encode);

//写完则关闭流
// rs.pipe(ws);

//不关闭ws
rs.pipe(ws,{end:false});
ws.write('\n继续写入.\n',encode);

//这句会报错，原因是流操作为异步，事实上pipe会在这之后执行，如果end那么pipe执行会报错．
//思考：如何更好的控制呢？比如pipe先执行，什么时候应该end了？
//目前合理的方法应该是分开执行
// ws.end();