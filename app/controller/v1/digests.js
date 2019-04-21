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

        const digest = {
            title: req.tetle,
            author: req.author,
            content: req.content,
            provenance: req.provenance,
            user_id: '5cb5e9f96d323c263c1eeff9',
            createTime: new Date()
        };

        if (!digest.content) {
            result.code = CONST.ERROR_PARAM;
            result.msg = "参数错误，请检查参数！";
            ctx.body = result;
            return;
        }
        // TODO: 检查 token 关联 user

        var tmpResult = await ctx.model.Digest.create(digest);
        if (tmpResult) {
            result.code = CONST.SUCCESS;
            result.msg = "创建成功！";
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

        var tmpResult = await ctx.model.Digest.find({});
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