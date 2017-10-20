'use strict';

/**
 * koa middleware that try to authenticate user from cookie, header, etc.
 * 
 * Use ctx.state.__user__ to access user object.
 */

const
    crypto = require('crypto'),
    logger = require('../logger'),
    config = require('../config'),
    api = require('../api'),
    db = require('../db'),
    auth = require('../auth'),
    SECURE = config.session.https,//default:false
    COOKIE_NAME = config.session.cookie,//default:'isession'
    COOKIE_SALT = config.session.salt,//default: 'lovershouse.js'
    COOKIE_EXPIRES_IN_MS = config.session.expires * 1000,//defalut:7 days
    User = db.User,
    LocalUser = db.LocalUser,
    AuthUser = db.AuthUser;

function _verifyPassword(id, passwd, expectedHash) {
    logger.info(`local id: ${id}, password: ${passwd}.`);
    let actualHash = crypto.createHash('sha1').update(id + ':' + passwd).digest('hex');
    return actualHash === expectedHash;
}

//parse header 'Authorization: Basic xxxx'
//即basic验证请求，用户名和密码
async function _parseAuthorization(auth) {
    logger.info('try parse header: Authorization: ' + auth);
    if ((auth.length < 6) || (auth.substring(0, 6) !== 'Basic ')) {
        return null;
    }
    let
        u, p, user, luser,
        up = Buffer.from(auth.substring(6), 'base64').toString().split(':');
    if (up.length !== 2) {
        return null;
    }
    u = up[0];
    p = up[1];
    if (!u || !p) {
        return null;
    }
    user = await User.findOne({
        where: {
            'email': u
        }
    });
    if (user) {
        luser = await LocalUser.findOne({
            where: {
                'user_id': user.id
            }
        });
        if (luser && _verifyPassword(luser.id, p, luser.passwd)) {
            logger.debug('binded user: ' + user.name);
            return user;
        }
    }
    logger.debug('invalid authorization header.');
    return null;
}

function _checkIsLocked(user) {
    if (user === null) {
        return null;
    }
    if (user.locked_until > Date.now()) {
        logger.warn('CANNOT signin: user ' + user.email + ' is still locked.');
        return null;
    }
    return user;
}

module.exports = async (ctx, next) => {
    ctx.state.__user__ = null;
    let
        user = null,
        request = ctx.request,
        response = ctx.response,
        path = request.path,
        cookie = ctx.cookies.get(COOKIE_NAME);
    if (cookie) {//存在cookie,则解析cookie并判断是否用户被锁(比如注册未激活)，用户被锁（锁的时间如果大于当前时间则代表被锁）和用户为空一样处理
        logger.info('try to parse session cookie...');
        user = await auth.parseSessionCookie(cookie);
        user = _checkIsLocked(user);
        if (user) {
            logger.info('bind user from session cookie: ' + user.email)
        } else {//cookie失效，删除
            logger.info('invalid session cookie. cleared.');
            ctx.cookies.set(COOKIE_NAME, 'deleted', {
                path: '/',
                httpOnly: true,
                secureProxy: SECURE,
                expires: new Date(0)
            });
        }
    } else {
        logger.info('cookie not found.');
    }
    if (user === null) {//用户为空，则需要验证
        let authHdr = request.get('authorization');
        if (authHdr) {
            logger.info('try to parse authorization header...');
            user = await _parseAuthorization(authHdr);
            user = _checkIsLocked(user);//判断是否被锁
            if (user) {
                logger.info('bind user from authorization: ' + user.email);
            } else {
                logger.warn('invalid authorization header.');
            }
        }
    }
    if (user) {
        ctx.state.__user__ = {
            id: user.id,
            role: user.role,
            email: user.email,
            verified: user.verified,
            name: user.name,
            image_url: user.image_url,
            created_at: user.created_at
        };
    }

    //创建ctx.checkPermission函数，检查权限用
    ctx.checkPermission = (expectedRole) => {
        if (ctx.state.__user__ === null || (ctx.state.__user__.role > expectedRole)) {
            logger.warn('check permission failed: expected = ' + expectedRole + ', actual = ' + (ctx.state.__user__ ? ctx.state.__user__.role : 'null'));
            throw api.notAllowed('Do not have permission.');
        }
    };
    await next();
};
