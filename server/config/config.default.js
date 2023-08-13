/* eslint valid-jsdoc: "off" */

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {

  const config = {}

  config.keys = appInfo.name + '_1557145862828_145'

  config.middleware = []

  config.cluster = {
    listen: {
      port: 7003
    }
  }

  config.bodyParser = {
    jsonLimit: '10mb',
    formLimit: '10mb',
  }

  config.security = {
    csrf: false
  }

  config.passportLocal = {
    usernameField: 'loginName',
    passwordField: 'password'
  }

  config.title = '小慧系统管理平台'

  // 数据库配置 [必须]
  config.sequelize = {
    dialect: 'mysql',
    database: 'personal_manage',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '123456',
    timezone: '+08:00'

  }

  // github配置信息 [可选, 默认使用作者的信息, 但启动端口不可修改]
  config.passportGithub = {
    key: '736a77b74280ce7f52f2',
    secret: 'c6c5360bc7fae13443cc760e020295220425fe6a',
    callbackURL: 'http://www.arterning.site/api/passport/github/callback',
    redirectURL: '/',
    successRedirect: '/api/passport/github/success',
    failureRedirect: '/?state=0'
  }

  // 邮箱配置信息 [可选, 默认使用测试账号]
  config.mailer = {
    host: 'smtp.2980.com',
    port: 25,
    secure: false,
    auth: {
      user: 'ninghuang@gmail.com',
      pass: 'a123456'
    }
  }

  // 自己邮箱, 用于通知报告
  config.email = 'ninghuang@gmail.com'

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    allowHeaders: 'Content-Type,X-Requested-With,Authorization,Origin,Accept,cancelRequest,isLoading,errorAlert,successAlert,token'
  }

  return config
}
