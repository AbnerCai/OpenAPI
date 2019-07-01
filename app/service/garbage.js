
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

    const garbage = {
      name: data.name,
      createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      garbageType: data.type
    };

    var tmpResult = await ctx.model.Garbage.create(garbage);
    return tmpResult;
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