'use strict'

const 
    nunjucks = require('nunjucks'),
    path = require('path'),
    logger = require('../logger');

//从opts中获取各属性值(没有则设置默认值)，并初始化nunjucks
function createEnv(path,opts){
    logger.info('goto templating create env');
    var
        autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path,{
                noCache:noCache,
                watch:watch
            }),{
                autoescape:autoescape,
                throwOnUndefined:throwOnUndefined
            }
        );
        if(opts.filters){
            for(var f in opts.filters){
                env.addFilter(f,opts.filters[f]);
            }
        }
        return env;
};

//给'ctx'设置render函数
function templating(path,opts){
    logger.info('before templating create env');
    var env = createEnv(path,opts);
    return async(ctx,next)=>{
        ctx.render = function(view,model){
            //Object.assign({}, ctx.state || {}, model || {})使用是为了扩展model.
            //三个参数，将第二个与第三个参数的所有属性放到第一个参数中，可以将ctx.state这个公共变量传给每一个view来处理
            ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
            ctx.response.type = 'text/html';
        }
        await next();
    };
};

//'views'为路径，当前路径下的views目录
// var env = createEnv('views',{
//     watch:true,
//     filters:{//定义filters
//         hex:function(n){//filter名称hex,返回16进制字符串
//             return '0x' + n.toString(16);
//         }
//     }
// });

module.exports = templating;