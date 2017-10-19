'use strict'

var fn_signin = async(ctx,next)=>{
    ctx.response.body = `<h1>Log in!</h1>
    <form action="/signin-verify" method="post">
        <p>Name:<input name="name" value="koa"></p>
        <p>Password:<input name="password" type="password"></p>
        <p><input type="submit" value="Submit"></p>
    </form>`;
};

var fn_signin_verify = async(ctx,next)=>{
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
};

module.exports = {
    'GET /signin':fn_signin,
    'POST /signin-verify':fn_signin_verify
};