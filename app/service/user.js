
const Service = require('egg').Service;

const uuid = require('uuid');
const moment = require('moment');

const USER_TOKEN = "token:";

// 6 小时
const SECONDS = 6 * 60 * 60;

class UserService extends Service {

    /**
     * 生成用户登录 token
     * */
    async generateToken(app, user) {
        const token = uuid.v4().toString().replace(/-/g, "");
        var tokenContent = {
            userId: user._id,
            token: token,
            email: user.email,
            createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        };
        var tmp = await app.redis.set(USER_TOKEN + token, JSON.stringify(tokenContent), 'EX', SECONDS);
        console.log("token: " + tmp);

        return token;
    }

    /**
     * 验证 token
     * */
    async verifyToken(app, token) {
        const tokenContent = await app.redis.get(USER_TOKEN + token);
        if (tokenContent) {
            const userId = JSON.parse(tokenContent).userId;
            return userId;
        }
        return;
    }
}

module.exports = UserService;