'use strict';

const Controller = require('egg').Controller;

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
}

module.exports = UserController;