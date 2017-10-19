'use strict'

//导入Koa class,故大写
const Koa = require('koa');
const app = new Koa();

const bodyParser = require('koa-bodyparser');
const controller = require('./controller');

//调用异步函数处理请求
app.use(async(ctx,next)=>{
    console.log(`Process${ctx.request.method}${ctx.request.url}`);
    await next();
});


app.use(bodyParser());

//添加controller,可传入路径
app.use(controller());

//端口3000监听
app.listen(3000);
console.log('app started at port 3000...');
