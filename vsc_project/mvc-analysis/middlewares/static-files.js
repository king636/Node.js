'use strict'

const
    path = require('path'),
    mime = require('mime'),
    fs = require('mz/fs'),
    logger = require('../logger');

function staticFiles(url, dir) {
    logger.info('before async static files');
    return async (ctx, next) => {
        logger.info('goto async static files');
        let rpath = ctx.request.path;
        logger.info(`static request path: ${rpath}`);
        if (rpath.startsWith(url)) {
            let fp = path.join(dir, rpath.substring(url.length));
            logger.info(`deal static file: ${fp}`);
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