'use strict'

var fs = require('fs');
var data = 'nodejs sync';
//output.txt会被写到根目录下
fs.writeFileSync('output.txt',data);