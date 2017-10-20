'use strict'

/*
 *该项目用来分析app.js的执行流程，理顺middleware链的原理，具体分析见'流程分析'
 *
 */

const
    isProduction = process.env.NODE_ENV === 'production',
    HOSTNAME = require('os').hostname(),
    Koa = require('koa'),
    path = require('path'),
    bodyParser = require('koa-bodyparser'),
    templating = require('./middlewares/templating'),
    controller = require('./middlewares/controller'),
    logger = require('./logger');

logger.info(`init app, isProduction:${isProduction},host name:${HOSTNAME}`);

let app = new Koa();

//调用异步函数处理请求
app.use(async(ctx,next)=>{
    logger.info(`Process${ctx.request.method}${ctx.request.url}`);
    let
        startTime = Date.now(),
        execTime;
    try{
        await next();
    }catch(e){
        logger.error('error process request.',e);
    }
    logger.info(`Response: ${ctx.response.status}`);
    execTime = Date.now() - startTime;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
    ctx.response.set('X-Host', HOSTNAME);
});

if(!isProduction){
    logger.info('start static file deal');
    let staticFiles = require('./middlewares/static-files');
    app.use(staticFiles('/static/','./static'));
}

app.use(bodyParser());

//下面是两个连续的middleware，用来测试异常的捕获，在console.log(aaa)时发生变量aaa未定义的异常，也能被第一个middleware
//中的try catch捕获．说明只需要在第一个middleware使用try catch就可以捕获middleware链中发生的异常．
// app.use(async(ctx,next)=>{
//     console.log('test');
//     await next();
// });

// app.use(async(ctx,next)=>{
//     console.log(aaa);//模拟异常发生
// });

app.use(templating('views',{
    noCache:!isProduction,//正式环境需要缓存，开发环境不需要
    watch:!isProduction
}))

//添加controller,可传入路径
app.use(controller());

//端口3000监听
app.listen(3000);
console.log('app started at port 3000...');

var test = (abc)=>{
    return 4;
}
console.log(test);
