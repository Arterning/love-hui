'use strict'
const md5 = require("blueimp-md5")

/**
 * 用户管理
 * @type {Controller}
 */

const Controller = require('egg').Controller

class UserController extends Controller {

  /**
   * 注册用户
   * @returns {Promise<void>}
   */
  async createUser() {
    const { ctx, service } = this
    const { name, email, password, uid } = ctx.request.body
    const user = {
      loginName: name,
      username: name,
      email,
      uid,
      password: md5(password),
      ipAddr: '127.0.0.1'
    }
    const result = service.user.register(user)
    ctx.body = result
  }

  async getUser() {
    const { ctx } = this
    ctx.print = { userInfo: ctx.user }
  }

  async logout() {
    const { ctx } = this
    ctx.logout && ctx.logout()
    ctx.print = { msg: '已登出' }
  }

  // 授权成功回调方法
  async passportSuccessCallback() {
    const { ctx, config } = this
    const user = ctx.user || {}
    const url = config.passportGithub.redirectURL || '/'
    ctx.redirect(`${url}?token=${user.token}`)
  }

  // 通过token登录
  async accessToken() {
    const { ctx } = this
    const token = ctx.query.token
    if (!token) {
      ctx.print = { errorCode: 400, msg: 'token不能为空' }
      return
    }
    const user = await ctx.service.user.findUserByToken(token)
    if (!user) {
      ctx.print = { errorCode: 2, msg: 'token失效' }
      return
    }
    ctx.print = { userInfo: user }
  }

  // 更新用户信息
  async updateUser() {
    const { ctx } = this
    const { password, email, location, bio } = ctx.request.body
    const uid = ctx.user.uid
    if (!password) {
      ctx.print = { errorCode: 400 }
      return
    }
    try {
      const userInfo = await ctx.service.user.updateUser(uid, { password, email, location, bio })
      ctx.print = { msg: '更新成功', userInfo: userInfo }
    } catch {
      ctx.print = { errorCode: 3, msg: '更新失败' }
    }
  }
}

module.exports = UserController
