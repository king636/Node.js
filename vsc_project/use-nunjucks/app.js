'use strict'

const nunjucks = require('nunjucks');

//从opts中获取各属性值(没有则设置默认值)，并初始化nunjucks
function createEnv(path,opts){
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

//'views'为路径，当前路径下的views目录
var env = createEnv('views',{
    watch:true,
    filters:{//定义filters
        hex:function(n){//filter名称hex,返回16进制字符串
            return '0x' + n.toString(16);
        }
    }
});

var s = env.render('hello.html',{
    name:'nick',
    fruits:['apple','pear','banana'],
    count:10000
})

console.log(s);

console.log(env.render('extend.html',{
    header:'Extend',
    body:'hello, nick'
}));