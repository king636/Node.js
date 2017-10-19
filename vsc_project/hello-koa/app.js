'use strict'

//导入Koa class,故大写
const Koa = require('koa')
//创建对象
const app = new Koa()

//调用异步函数处理请求
app.use(async(ctx,next)=>{
    await next()
    //设置Content-Type
    ctx.response.type = 'text/html'
    //设置内容
    ctx.response.body = '<h1>Hello Koa</h1>'
})

//端口3000监听
app.listen(3000)
console.log('app started at port 3000...')