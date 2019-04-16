
const Service = require('egg').Service;

/**
 * Module dependencies.
 * @private
 */
const nodemailer = require('nodemailer');

class EmailService extends Service {

    /**
     * 发送文章.
     * */
    async sendActivationUrl(to, url, callback) {
        const { app, ctx } = this;
        /**
         * 定义邮件信息.
         * */
        const transporter = nodemailer.createTransport({
            host: app.config.email.host,
            port: app.config.email.port,
            auth: {
                user: app.config.email.auth.user,
                pass: app.config.email.auth.pass
            }
        });

        let mailOptions = {
            from: app.config.email.auth.user, // 发送者
            to: to, // 接受者,可以同时发送多个,以逗号隔开
            subject: '激活邮箱账号验证', // 标题
            //text: 'Hello world', // 文本
            html: '<p>欢迎使用OpenAPI，请点击以下链接进行激活<\p>' +
                '<a href="'+ url +'">' + url + '</a>'
        };

        ctx.logger.info(mailOptions);

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                ctx.logger.error(err);
                callback(err);
                return;
            }
            ctx.logger.info(info);
            ctx.logger.info(date.getTime() + ' 邮件发送成功');
            callback(null, info);
        });
    }
}

module.exports = EmailService;