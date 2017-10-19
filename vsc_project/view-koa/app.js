'use strict'

//导入Koa class,故大写
const Koa = require('koa');
const app = new Koa();

const bodyParser = require('koa-bodyparser');
const controller = require('./controller');

const templating = require('./templating');
//判断是否是正式环境，正式环境一定要配置为production.
//问题：如何配置？在launch.json中配置，当前为development，正式环境需要修改为production
const isProduction = process.env.NODE_ENV === 'production';

//调用异步函数处理请求
app.use(async(ctx,next)=>{
    console.log(`Process${ctx.request.method}${ctx.request.url}`);
    var
        startTime = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - startTime;
    console.log(`The response time: ${execTime}ms`);
});

if(!isProduction){
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/',__dirname + '/static'));
}

app.use(bodyParser());

app.use(templating('views',{
    noCache:!isProduction,//正式环境需要缓存，开发环境不需要
    watch:!isProduction
}))

//添加controller,可传入路径
app.use(controller());

//端口3000监听
app.listen(3000);
console.log('app started at port 3000...');
