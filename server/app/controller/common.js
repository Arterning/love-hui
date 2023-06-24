'use strict'

const Controller = require('egg').Controller
const svgCaptcha = require('svg-captcha')
const dayjs = require('dayjs')
const md5 = require('blueimp-md5')

class Common extends Controller {

  async index() {
    const { ctx } = this
    ctx.body = 'Welcome to Personal Management System !'
  }

  async ceateUser() {
    const { ctx, service } = this
    const user = {
      uid: '1',
      loginName: 'ning',
      username: 'ning',
      password: md5('ning'),
      ipAddr: '127.0.0.1'
    }
    service.user.register(user)
  }

  async captcha() {
    const { ctx } = this
    const code = ctx.query.code || '1234'
    const svg = svgCaptcha(code)

    ctx.type = 'svg'
    ctx.body = svg
  }

  // 获取后台首页面板数据
  async getPanelData() {
    const { ctx, service } = this

    let [price, todayTask, unfinishedTodoList, reminder] = await Promise.all([
      service.capitalFlow.findSumPriceByDate(dayjs().format('YYYY-MM-DD')),
      service.task.findAllByUid({ type: { [ctx.Op.in]: [1, 2] } }),
      service.todoList.findUnfinishedByUid(),
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
