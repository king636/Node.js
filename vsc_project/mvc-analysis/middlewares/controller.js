'use strict'

var 
    fs = require('fs'),
    path = require('path'),
    logger = require('../logger');

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
    logger.info('goto add controllers');
    //path.dirname(__dirname)获取根路径
    var pa = path.dirname(__dirname) + '/' + dir;
    fs.readdirSync(pa).filter((f)=>{
      return f.endsWith('.js');
    }).forEach((f)=>{
        let mapping = require(pa + '/' + f);
        addMapping(router,mapping);
    });
};

function addMapping(router, mapping){
    logger.info('goto addMapping');
    for(var url in mapping){
        if(url.startsWith('GET')){
            var path = url.substring(4);
            logger.info('router put get path: ' + path + ',deal: ' + mapping[url]);
            router.get(path,mapping[url]);
            logger.info(`register URL mapping:GET ${path} `);
        }else if(url.startsWith('POST')){
            var path = url.substring(5);
            logger.info('router put post path: ' + path + ',deal: ' + mapping[url]);
            router.post(path,mapping[url]);
            logger.info(`register URL mapping:POST ${path} `);
        }else{
            logger.info(`invalid url: ${url} `);
        }
    }
};

module.exports = function(dir){
    let 
        controller_dir = dir || 'controllers',
        router = require('koa-router')();

    addCtrollers(router, controller_dir);
    return router.routes();
}