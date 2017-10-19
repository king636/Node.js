'use strict'

const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');

function staticFiles(url, dir) {
    return async (ctx, next) => {
        let rpath = ctx.request.path;
        console.log(`static request path: ${rpath}`);
        if (rpath.startsWith(url)) {
            let fp = path.join(dir, rpath.substring(url.length));
            console.log(`deal static file: ${fp}`);
            if (await fs.exists(fp)) {
                ctx.response.type = mime.lookup(rpath);//如何实现？
                ctx.response.body = await fs.readFile(fp);
            } else {
                ctx.response.status = 404;
            }
        } else {
            await next();
        }
    };
}

module.exports = staticFiles;