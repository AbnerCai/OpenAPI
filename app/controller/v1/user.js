'use strict';

const Controller = require('egg').Controller;

const uuid = require('uuid');
const crypto = require('crypto');

const moment = require('moment');

const CONST = require('./constant');

// 6 小时
const SECONDS = 6 * 60 * 60;

const ACTIVATION_CODE_KEY = "activation_code:";



class UserController extends Controller {
    async index() {
        const { ctx } = this;
        var user = {
            email: "hello",
            password: "world",
            registerTime: new Date()
        };
        await ctx.model.User.create(user);
        ctx.body = await ctx.model.User.find({});
    }

    /**
     * 用户注册.
     * */
    async register() {
        const { app, ctx } = this;
        const req = ctx.request.body;

        var result = {};

        var user = {
            email: req.email,
            password: req.password,
            salt: uuid.v4().toString().replace(/-/g, ""),
            token: uuid.v1().toString().replace(/-/g, ""),
            status: 2, // 未激活
            registerTime: new Date()
        };

        // TODO: 校验邮箱的合法性和密码的合法性
        if (!user.email || !user.password) {
            result.code = CONST.ERROR_PARAM;
            result.msg = "参数错误，请检查参数！";
            ctx.body = result;
            return;
        }

        var md5 = crypto.createHash('md5');
        // 存储密码加盐
        user.password = md5.update(user.email + user.password + user.salt).digest('hex');

        // 检验邮箱是否注册过.
        var tmp = await ctx.model.User.find({ email: user.email });
        console.log(tmp);

        if (tmp && tmp.length > 0) {
            result.code = CONST.ERROR_EMAIL;
            result.msg = "该邮箱已被注册";

            // 判断邮箱是否激活，未激活再次发送激活邮件
            if (tmp[0].status && tmp[0].status == 2) {
                // 发送激活邮件
                sendActivationEmail(ctx, app, user.email);
                result.code = CONST.ERROR_EMAIL_NO_ACTIVATION;
                result.msg = "该邮箱未激活，已重新发送激活邮件，请查收。";
            }

            ctx.body = result;
            return;
        }
        // 创建用户
        tmp = await ctx.model.User.create(user);
        console.log(tmp);

        if (tmp) {
            // 发送激活邮件
            sendActivationEmail(ctx, app, user.email);

            delete user.password;
            delete user.salt;

            result.code = CONST.SUCCESS;
            result.msg = "注册成功！";
            result.data = user;
            ctx.body = result;
            return;
        } else {
            result.code = CONST.ERROR_MONGODB;
            result.msg = "注册失败！";
            ctx.body = result;
        }
    }

    /**
     * 邮箱激活
     * */
    async activate() {
        const { app, ctx } = this;
        const query = ctx.query;
        const activationCode = query.activationCode;
        const email = query.email;

        var result = {};

        if (!activationCode || !email) {
            result.code = CONST.ERROR_PARAM;
            result.msg = "参数错误，激活失败！";
            ctx.body = result;
            return;
        }

        // 激活操作
        var codeContent = await app.redis.get(ACTIVATION_CODE_KEY + activationCode);
        if (!codeContent) {
            result.code = CONST.ERROR_ACTIVATION_CODE_FAILURE;
            result.msg = "激活码失效！";
            ctx.body = result;
            return;
        }

        console.log(codeContent);
        // 验证激活信息
        const codeEmail = JSON.parse(codeContent).email;
        if (email !== codeEmail) {
            result.code = CONST.ERROR_ACTIVATION_CODE_INVALID;
            result.msg = "无效激活码！";
            ctx.body = result;
            return;
        }

        // 更新状态信息
        var tmp = await ctx.model.User.updateOne({
            "email": email
        },{
            status: 1
        });

        console.log(tmp);
        if (tmp && tmp.ok === 1) {
            result.code = CONST.SUCCESS;
            result.msg = "激活成功！";
        } else {
            result.code = CONST.ERROR_MONGODB;
            result.msg = "激活失败！";
        }

        ctx.body = result;
    }

    /**
     * 登录
     * */
    async login() {
        const { app, ctx } = this;
        const req = ctx.request.body;

        var result = {};

        var user = {
            email: req.email,
            password: req.password,
        };

        // TODO: 校验邮箱的合法性和密码的合法性
        if (!user.email || !user.password) {
            result.code = CONST.ERROR_PARAM;
            result.msg = "参数错误，请检查参数！";
            ctx.body = result;
            return;
        }

        // 根据邮箱查找用户.
        var tmp = await ctx.model.User.find({ email: user.email });
        console.log(tmp);

        if (tmp && tmp.length > 0) {
            // 判断邮箱是否激活，未激活登录失败
            if (tmp[0].status && tmp[0].status == 2) {
                // 发送激活邮件
                sendActivationEmail(ctx, app, user.email);
                result.code = CONST.ERROR_EMAIL_NO_ACTIVATION;
                result.msg = "该邮箱未激活，已重新发送激活邮件，请查收。";
                ctx.body = result;
                return;
            }
            if (tmp[0].password && tmp[0].salt) {
                var md5 = crypto.createHash('md5');
                // 存储密码加盐
                var password = md5.update(user.email + user.password + tmp[0].salt).digest('hex');
                if (password === tmp[0].password) {
                    // 生成token
                    const token = await ctx.service.user.generateToken(app, tmp[0]);
                    result.code = CONST.SUCCESS;
                    result.msg = "登录成功！";
                    result.data = {
                      email: user.email,
                      token: token
                    };
                    ctx.body = result;
                    return;
                } else {
                    result.code = CONST.ERROR_PARAM;
                    result.msg = "登录失败！";
                    ctx.body = result;
                    return;
                }
            }
        }

        result.code = CONST.ERROR_EMAIL_UNREGISTER;
        result.msg = "当前邮箱未注册！";
        ctx.body = result;
    }
}

/**
 * 发送激活邮件
 * */
function sendActivationEmail(ctx, app, email) {
    var activationCode = uuid.v1().toString().replace(/-/g, "");
    var codeCotent = {
        activationCode: activationCode,
        email: email,
        createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        failureTime: moment().add(6,"hours").format('YYYY-MM-DD HH:mm:ss')
    };

    // 将激活信息写入Redis
    app.redis.set(ACTIVATION_CODE_KEY + activationCode, JSON.stringify(codeCotent), 'EX', SECONDS);

    // TODO: hook
    const activateUrl = app.config.hostname + app.config.activatePath +
        "?email=" + email + "&activationCode=" + activationCode;

    ctx.service.email.sendActivationUrl(email, activateUrl, (err, info)=>{
        if (err) {
            console.log("邮件发送失败");
            return;
        }
        console.log("邮件发送成功");
    });
}

module.exports = UserController;