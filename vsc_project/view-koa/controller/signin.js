'use strict'

module.exports = {
    'POST /signin':async(ctx,next)=>{
        var
            email = ctx.request.body.email || '',
            password = ctx.request.body.password || '';

        console.log(`login email:${email},password:${password}`);
        if(email === 'admin@example.com' && password === '123456'){
            console.log('sign in ok');
            ctx.render('signin-ok.html',{
                title:'Sign in OK'
            });
        }else{
            console.log('sign in failed');
            ctx.render('signin-failed.html',{
                title:'Sign in failed'
            })
        }
    }
}