'use strict'

const Controller = require('egg').Controller
const svgCaptcha = require('svg-captcha')
const dayjs = require('dayjs')


class Common extends Controller {

  /**
   * 首页
   * @returns {Promise<void>}
   */
  async index() {
    const { ctx } = this
    console.log("Welcome my friend Good Good")
    ctx.body = 'Hello, Welcome to Personal Management System !!!'
  }

  /**
   * 验证码
   * @returns {Promise<void>}
   */
  async captcha() {
    const { ctx } = this
    const code = ctx.query.code || '1234'
    const svg = svgCaptcha(code)

    ctx.type = 'svg'
    ctx.body = svg
  }

  /**
   * 获取后台首页面板数据
   * @returns {Promise<void>}
   */
  async getPanelData() {
    const { ctx, service, app } = this

    const today = dayjs().format('YYYY-MM-DD')
    let [price, todayTask, unfinishedTodoList, reminder] = await Promise.all([
      service.capitalFlow.findSumPriceByDate(dayjs().format('YYYY-MM-DD')),
      service.task.findAllByUid({ type: { [ctx.Op.in]: [1, 2] },
        [ctx.Op.and]: [
          app.Sequelize.where(
              app.Sequelize.fn('DATE', app.Sequelize.col('created_at')),
              '=',
              today
          )]}),
      service.dreamList.findUnfinishedByUid(),
      service.reminder.findAllByUid(null, { type: 1 })
    ])

    // 过滤支出
    price = price.filter(item => item.type === 2)
    ctx.print = {
      consumption: price.length > 0 ? price[0].price : '0.00',
      todayTaskCount: todayTask.length,
      unfinishedTodoListCount: unfinishedTodoList.count,
      reminderCount: reminder.count
    }
  }
}

module.exports = Common
