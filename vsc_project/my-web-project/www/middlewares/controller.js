'use strict';

/**
 * koa middleware to auto-scan & import controllers under dir 'controllers'.
 * update: Nick
 * author: Michael Liao
 */
const
    fs = require('fs'),
    path = require('path'),
    router = require('koa-router'),
    logger = require('../logger');

const METHODS = {
    'GET': 'get',
    'POST': 'post',
    'PUT': 'put',
    'DELETE': 'del'
};

// add url-route in /controllers:
function _addMapping(rt, mapping) {
    let url, method, path;
    for (url in mapping) {
        for (method in METHODS) {//这里注意，METHODS只是用来for使用，对应的小写字符串比如'get'其实没有用
            if (url.startsWith(method + ' ')) {
                path = url.substring(method.length).trim();
                // GET -> rt.get():
                rt[METHODS[method]](path, mapping[url]);
                logger.info(`register URL mapping: GET ${path}`);
                break;
            }
        }
    }
}

function _addControllers(rt, dir) {
    let basedir = path.dirname(__dirname);//获取根目录
    fs.readdirSync(basedir + '/' + dir).filter((f) => {
        return f.endsWith('.js');
    }).forEach((f) => {
        logger.info(`process controller: ${f}...`);
        let mapping = require(basedir + '/' + dir + '/' + f);
        _addMapping(rt, mapping);
    });
}

module.exports = function (dir='controllers') {
    let rt = router();
    _addControllers(rt, dir);
    return rt.routes();
};
