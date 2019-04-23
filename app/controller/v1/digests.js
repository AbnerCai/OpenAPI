'use strict';

const Controller = require('egg').Controller;

const CONST = require('./constant');

class DigestsController extends Controller {

    /**
     * 创建
     * */
    async create() {
        const { app, ctx } = this;
        const req = ctx.request.body;

        var result = {};

        // 校验 token, 关联 user
        const token = req.token;
        const userId = await ctx.service.user.verifyToken(app, token);
        if (!userId) {
            result.code = CONST.ERROR_TOKEN;
            result.msg = "token 无效！";
            ctx.body = result;
            return;
        }

        const digest = {
            title: req.tetle,
            author: req.author,
            content: req.content,
            provenance: req.provenance,
            isDelete: false,
            userId: userId,
            createTime: new Date()
        };

        if (!digest.content) {
            result.code = CONST.ERROR_PARAM;
            result.msg = "参数错误，请检查参数！";
            ctx.body = result;
            return;
        }

        var tmpResult = await ctx.model.Digest.create(digest);
        if (tmpResult) {
            delete digest.userId;
            delete digest.__v;
            delete digest.isDelete;
            result.code = CONST.SUCCESS;
            result.msg = "创建成功！";
            result.data = digest;
        } else {
            result.code = CONST.ERROR_MONGODB;
            result.msg = "创建失败！";
        }
        ctx.body = result;
    }

    /**
     * 修改
     * */
    async update() {

    }

    /**
     * 查询所有
     * */
    async index() {
        const { app, ctx } = this;
        var result = {};

        const query = this.ctx.query;
        const token = query.token;
        if (!token) {
            result.code = CONST.ERROR_PARAM;
            result.msg = "token 不能为空！";
            ctx.body = result;
            return;
        }
        // 校验 token, 关联 user
        const userId = await ctx.service.user.verifyToken(app, token);
        if (!userId) {
            result.code = CONST.ERROR_TOKEN;
            result.msg = "token 无效！";
            ctx.body = result;
            return;
        }

        var tmpResult = await ctx.model.Digest.find({userId: userId, isDelete: false}, {userId: 0, isDelete: 0});
        if (tmpResult) {
            result.code = CONST.SUCCESS;
            result.msg = "查询成功！";
            result.data = tmpResult;
        } else {
            result.code = CONST.ERROR_MONGODB;
            result.msg = "查询失败！";
        }
        ctx.body = result;
    }

    /**
     * 查询单个
     * */
    async show() {
        const { app, ctx } = this;
        const id = ctx.params.id;

    }

    /**
     * 删除
     * */
    async destroy() {

    }
}

module.exports = DigestsController;