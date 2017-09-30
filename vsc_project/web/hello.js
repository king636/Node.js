'use strict'

//导入http模块
var http = require('http');

//创建http server
var server = http.createServer(function(request,response){
    //获取请求的方法和url
    console.log(request.method + ':' + request.url);
    //响应头
    response.writeHead(200,{'Content-Type':'text/html'});
    //响应的页面内容
    response.end('<h1>Hello NodeJS</h1>');
});

//监听8080端口
server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080');