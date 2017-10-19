'use strict'

//导入Koa class,故大写
const Koa = require('koa');

//返回的是函数
const router = require('koa-router')();

const bodyParser = require('koa-bodyparser');

//创建对象
const app = new Koa();

app.use(bodyParser());

//调用异步函数处理请求
app.use(async(ctx,next)=>{
    console.log(`Process ${ctx.request.method}${ctx.request.url}`);
    await next();
});

//返回表单提交用户名密码后转到执行post
router.get('/signin',async(ctx,next)=>{
    ctx.response.body = `<h1>Log in!</h1>
    <form action="/signin-verify" method="post">
        <p>Name:<input name="name" value="koa"></p>
        <p>Password:<input name="password" type="password"></p>
        <p><input type="submit" value="Submit"></p>
    </form>`;
});

router.post('/signin-verify',async(ctx,next)=>{
    var
        name = ctx.request.body.name || '',//注意从request的body中获取,默认为''
        password = ctx.request.body.password || '';

    console.log(`login name:${name},password:${password}`);
    if(name === 'koa' && password === '12345'){
        ctx.response.body = `<h1>Hello,${name}</h1>`;
    }else{
        ctx.response.body = `<h1>Login failed</h1>
        <p><a href="/signin">Try again</a></p>`;
    }
});

//添加router
app.use(router.routes());

//端口3000监听
app.listen(3000);
console.log('app started at port 3000...');