
const Service = require('egg').Service;

const uuid = require('uuid');
const moment = require('moment');

class GarbageService extends Service {

  /**
   * 搜索
   * */
  async search(ctx, word) {

    const garbageSearch = {
      name: word,
      createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    };

    let result = {};

    // 搜索记录.
    var tmpResult = await ctx.model.GarbageSearch.create(garbageSearch);

    var tmpResult = await ctx.model.Garbage.find({name: word}, {isDelete: 0});
    ctx.logger.info(`垃圾条目: ${tmpResult}`);
    if (tmpResult && tmpResult.length > 0) {
      result.name = tmpResult[0].name;
      result.createTime = moment(tmpResult[0].createTime).format('YYYY-MM-DD HH:mm:ss');
      let typeId = tmpResult[0].garbageType;
      // 查询类别.
      var tmpResult = await ctx.model.GarbageType.find({ _id: typeId }, {});
      ctx.logger.info(`垃圾类别: ${tmpResult}`);
      result.type = tmpResult[0].name;
    }
    return result;
  }

  /**
   * 新建垃圾条目.
   * */
  async createGarbage(ctx, data) {
    let result = {};

    // 查询垃圾条目是否存在.
    var tmpResult = await ctx.model.Garbage.find({name: data.name}, {isDelete: 0});
    if (tmpResult && tmpResult.length > 0) {
      return { msg: '条目已存在' };
    }

    // 查询类别.
    var tmpResult = await ctx.model.GarbageType.find({ name: data.type }, {});
    ctx.logger.info(`垃圾类别: ${tmpResult}`);

    if (!tmpResult || tmpResult.length <= 0) {
      return { msg: '该类别不存在' };
    }

    const garbage = {
      name: data.name,
      createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      garbageType: tmpResult[0]['_id']
    };

    var tmpResult = await ctx.model.Garbage.create(garbage);
    ctx.logger.info(`垃圾条目: ${tmpResult}`);
    if (tmpResult) {
      return tmpResult;
    }
    return {};
  }

  /**
   * 新建垃圾分类.
   * */
  async createType(ctx, type) {

    const garbageType = {
      name: type,
      createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    };

    var tmpResult = await ctx.model.GarbageType.create(garbageType);
    return tmpResult;
  }
}

module.exports = GarbageService;