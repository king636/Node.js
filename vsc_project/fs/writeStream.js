'use strict'

var encode = 'utf-8';

var fs = require('fs');

var ws = fs.createWriteStream('./vsc_project/fs/sampleWriteStream.txt',encode);
ws.write('以文本形式写入流\n',encode);
ws.write('END.',encode);
ws.end();

var ws2 = fs.createWriteStream('./vsc_project/fs/sampleWriteStream2.txt',encode);
ws2.write(new Buffer('以二进制形式写入流\n',encode));
ws2.write(new Buffer('END.',encode));
ws2.end();