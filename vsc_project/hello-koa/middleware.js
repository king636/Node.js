'use strict'

const Koa = require('koa')
const app = new Koa()

app.use(async(ctx, next)=>{
    //打印请求的方法和url
    console.log(`${ctx.request.method}${ctx.request.url}`)
    //调用下一个middleware
    await next()
})

app.use(async(ctx, next)=>{
    //获取当前时间
    const start = new Date().getTime();
    //调用下一个middleware
    await next()
    //耗费时间
    const ms = new Date().getTime() - start 
    console.log(`Time:${ms}ms`)
})

app.use(async(ctx, next)=>{
    //调用下一个middleware
    await next()
    console.log('response')
    ctx.response.type = 'Text/Html'        
    ctx.response.body = '<h1>Hello koa2!</h1>'
})

app.listen(3000)
console.log('app started at port 3000...')