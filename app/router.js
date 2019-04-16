'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.post('/v1/user/register', controller.v1.user.register);
  router.get('/v1/user/activate', controller.v1.user.activate);
  router.post('/v1/user/login', controller.v1.user.login);
};
