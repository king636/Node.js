'use strict'

//导入Koa class,故大写
const Koa = require('koa');

//返回的是函数
const router = require('koa-router')();
//以上相当于
// const fn_router = require('koa-router');
// const router = fn_router();

//创建对象
const app = new Koa();

//调用异步函数处理请求
app.use(async(ctx,next)=>{
    console.log(`Process${ctx.request.method}${ctx.request.url}`);
    await next();
});

router.get('/hello/:name',async(ctx,next)=>{
    var name = ctx.params.name;
    ctx.response.body = `<h1>hello,${name}!</h1>`;
});

router.get('/',async(ctx,next)=>{
    ctx.response.body = '<h1>index!</h1>';
});

//添加router
app.use(router.routes());

//端口3000监听
app.listen(3000);
console.log('app started at port 3000...');