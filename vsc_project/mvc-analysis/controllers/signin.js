'use strict'

const 
    logger = require('../logger');

module.exports = {
    'POST /signin':async(ctx,next)=>{
        var
            email = ctx.request.body.email || '',
            password = ctx.request.body.password || '';

        logger.info(`login email:${email},password:${password}`);
        if(email === 'admin@example.com' && password === '123456'){
            logger.info('sign in ok');
            ctx.render('signin-ok.html',{
                title:'Sign in OK'
            });
        }else{
            logger.info('sign in failed');
            ctx.render('signin-failed.html',{
                title:'Sign in failed'
            })
        }
    }
}