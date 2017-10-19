//file_server.js中的请求方式改为目录，查找目录下如果存在index.html或者default.html则返回
'use strict'

var
    fs = require('fs'),  //注意定义多个变量使用,隔开
    url = require('url'),
    path = require('path'),
    http = require('http')

//获取root目录，默认为当前路径(当前ubuntu上：/home/nick/work/nodejs)
//process.argv[2] 输出：undefined
var root = path.resolve(process.argv[2] || '.')
console.log('Static root dir: ' + root)

//创建http server
var server = http.createServer(function(request,response){
    //获取请求的方法和url
    console.log(request.method + ':' + request.url)

    //获取请求url中的pathname
    //本例中请求url为http://localhost:8080
    //pathname为:/index.html
    var pathname = url.parse(request.url).pathname
    //获取本地对应的文件路径
    // var filepath = path.join(root,pathname);

    //扩展：本例中静态页面index.html放到static目录下，所以需要将文件路径转换下
    //这里使用path转换后，就不需要考虑是linux系统还是windows系统了
    //note: pathname这里是'/index.html'　使用'index.html'效果是一样的; 'static'与'/static'也一样
    var filepath = path.join(root,'static',pathname)

    //获取文件状态
    fs.stat(filepath,function(err,stats){
        if(!err && stats.isFile()){//文件获取成功
            success(filepath,request,response)
        }else if(!err && stats.isDirectory()){
            fs.readdir(filepath,function(err,files){
                if(err){
                    fail(request,response)
                }else if(files.includes('index.html')){
                    filepath = path.join(filepath,'index.html')
                    success(filepath,request,response)
                }else if(files.includes('default.html')){
                    filepath = path.join(filepath,'default.html')
                    success(filepath,request,response)
                }
            })
        }else{
           fail(request,response)
        }
    })
})

function success(filepath,request,response){
    console.log('200' + request.url)
    //返回200状态
    response.writeHead('200')
    //文件流写入response中
    fs.createReadStream(filepath).pipe(response)
}

function fail(request,response){
    console.log('404' + request.url)
    //返回404状态
    response.writeHead('404')
    response.end('404 Not Found')//response对象是一个Writable Stream,不用pipe时需要end()
}



//监听8080端口
server.listen(8080)

console.log('Server is running at http://127.0.0.1:8080')

// 本例console打印：
// GET:/index.html
// 200/index.html
// GET:/css/uikit.min.css
// GET:/js/jquery.min.js
// 200/css/uikit.min.css
// 200/js/jquery.min.js
// GET:/fonts/fontawesome-webfont.woff2
// 200/fonts/fontawesome-webfont.woff2