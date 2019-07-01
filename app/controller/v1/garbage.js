'use strict';

const Controller = require('egg').Controller;

const CODE = require('../../constant/code');

class GarbageController extends Controller {

  /**
   * 查询垃圾分类.
   * */
  async index() {
    const { app, ctx } = this;

    var result = {};

    const word = ctx.query.w;
    ctx.logger.info(word);

    if (!word) {
      result.code = CODE.ERROR_PARAM;
      result.msg = "参数错误！";
      ctx.body = result;
    }

    const tmpResult = await ctx.service.garbage.search(ctx, word);
    ctx.logger.info(tmpResult);
    if (tmpResult.name) {
      result.code = CODE.SUCCESS;
      result.msg = "查询成功！";
      result.data = tmpResult;
    } else {
      result.code = CODE.ERROR_MONGODB;
      result.msg = "查询失败！";
    }
    ctx.body = result;
  }

  /**
   * 新增垃圾条目
   * */
  async create() {
    const { app, ctx } = this;

    var result = {};

    const req = ctx.request.body;

    const name = req.name;
    const type = req.type;
    if (!name || !type) {
      result.code = CODE.ERROR_PARAM;
      result.msg = "参数错误！";
      ctx.body = result;
    }

    const data = {
      name,
      type,
    };

    const tmpResult = await ctx.service.garbage.createGarbage(ctx, data);

    if (tmpResult) {
      result.code = CODE.SUCCESS;
      result.msg = "新增成功！";
      result.data = tmpResult;
    } else {
      result.code = CODE.ERROR_MONGODB;
      result.msg = "新增失败！";
    }
    ctx.body = result;
  }
}

module.exports = GarbageController;