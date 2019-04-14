'use strict';

const Controller = require('egg').Controller;

const uuid = require('uuid');
const crypto = require('crypto');
const md5 = crypto.createHash('md5');

// 成功
const SUCCESS = 0;
// 参数错误
const ERROR_PARAM = 20140;
// 参数错误
const ERROR_EMAIL = 20126;

class UserController extends Controller {
    async index() {
        const { ctx } = this;
        var user = {
            email: "hello",
            password: "world",
            registerTime: new Date()
        }
        await ctx.model.User.create(user);
        ctx.body = await ctx.model.User.find({});
    }

    /**
     * 用户注册.
     * */
    async register() {
        const { ctx } = this;
        const req = ctx.request.body;

        var result = {};

        var user = {
            email: req.email,
            password: req.password,
            salt: uuid.v1().toString().replace(/-/g, ""),
            registerTime: new Date()
        };

        // TODO: 校验邮箱的合法性和密码的合法性
        if (!user.email && !user.password) {
            result.code = ERROR_PARAM;
            result.msg = "参数错误，请检查参数！";
            ctx.body = result;
            return;
        }

        // 存储密码加盐
        user.password = md5.update(user.email + user.password + user.salt).digest("hex");

        // TODO: 检验邮箱是否注册过.
        var tmp = await ctx.model.User.find({ email: user.email });
        console.log(tmp);

        if (tmp && tmp.length != 0) {
            result.code = ERROR_EMAIL;
            result.msg = "该邮箱已被注册";
            ctx.body = result;
            return;
        }

        tmp = await ctx.model.User.create(user);
        console.log(tmp);

        // TODO: 发送注册邮件

        delete user.password;
        delete user.salt;

        console.log(user);

        result.code = SUCCESS;
        result.msg = "注册成功！";
        result.data = user;
        ctx.body = result;
    }
}

module.exports = UserController;