/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1554899271591_2961';

  // add your middleware config here
  config.middleware = [];

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    },
  };

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/open_api',
      options: {
        auth: {
          user: "api",
          password: "api"
        }
      },
    },
  };

  config.redis = {
    client: {
      port: 6379,          // Redis port
      host: '127.0.0.1',   // Redis host
      password: '',
      db: 2,
    },
  };

  // add your user config here
  const userConfig = {
    hostname: "http://127.0.0.1:7001/",
    activatePath: "v1/user/activate"
  };

  return {
    ...config,
    ...userConfig,
  };
};
