'use strict'

var fs = require('fs');

function addCtrollers(router,dir){
    //这里使用同步读取，因为app.js初始化只执行一次，无性能问题
    // var files = fs.readdirSync(__dirname + '/' + dir);

    // //过滤出js文件
    // var js_files = files.filter((f)=>{
    //     return f.endsWith('.js');

    // //导入模块
    // for(var f of js_files){
    //     let mapping = require(__dirname + '/controller/' + f);
    //     addMapping(router,mapping);
    // };

    //以上简写：
    var path = __dirname + '/' + dir;
    fs.readdirSync(path).filter((f)=>{
      return f.endsWith('.js');
    }).forEach((f)=>{
        let mapping = require(path + '/' + f);
        addMapping(router,mapping);
    });
};

function addMapping(router, mapping){
    for(var url in mapping){
        if(url.startsWith('GET')){
            var path = url.substring(4);
            router.get(path,mapping[url]);
            console.log(`register URL mapping:GET ${path} `);
        }else if(url.startsWith('POST')){
            var path = url.substring(5);
            router.post(path,mapping[url]);
            console.log(`register URL mapping:POST ${path} `);
        }else{
            console.log(`invalid url: ${url} `);
        }
    }
};

module.exports = function(dir){
    let 
        controller_dir = dir || 'controller',
        router = require('koa-router')();

    addCtrollers(router, controller_dir);
    return router.routes();
}