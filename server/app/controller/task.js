'use strict'

/**
 * 代办管理
 * @type {Controller}
 */
const Controller = require('egg').Controller

class TaskController extends Controller {
  async index() {
    const { ctx, service, app } = this
    const { startDate, endDate } = ctx.query
    const where = {
      [ctx.Op.and]: [
        app.Sequelize.where(
            app.Sequelize.fn('DATE', app.Sequelize.col('created_at')),
            '<=',
            endDate
        ),
        app.Sequelize.where(
            app.Sequelize.fn('DATE', app.Sequelize.col('created_at')),
            '>=',
            startDate
        )
      ]
    }
    const result = await service.task.findAllByUid(where)

    const data = {
      wait: [],
      process: [],
      finished: [],
      unfinished: []
    }

    result.forEach(item => {
      switch (item.type) {
        case 1:
          data.wait.push(item)
          break
        case 2:
          data.process.push(item)
          break
        case 3:
          data.finished.push(item)
          break
        case 4:
          data.unfinished.push(item)
          break
        default:
      }
    })

    ctx.print = data
  }

  async create() {
    const { ctx, service } = this

    try {
      ctx.validate({
        date: { type: 'datetime', default: new Date() },
        content: { type: 'string', convertType: 'string', max: 200 },
        count: { type: 'number', convertType: 'number', min: 0, max: 5 },
      })
    } catch (e) {
      ctx.print = {
        errorCode: 400,
        msg: e.message,
        errorMsg: e
      }
      return
    }

    const { date, content, count, partner } = ctx.request.body
    console.log(ctx.user.uid)
    try {
      await service.task.create(ctx.user.uid, {
        createdAt: date,
        content,
        count,
        partner
      })
      ctx.print = { msg: '新增成功' }
    } catch {
      ctx.print = { errorCode: 3 }
    }
  }

  async destroy() {
    const { ctx, service } = this
    const id = ctx.params.id
    await service.task.deleteById(id)
    ctx.print = { msg: '删除成功' }
  }

  async update() {
    const { ctx, service } = this
    const id = ctx.params.id
    const { rollback } = ctx.request.body
    const result = await service.task.findById(id)
    if (!result) {
      ctx.print = { errorCode: 2 }
      return
    }
    if (rollback !== null && rollback !== undefined) {
      const type = rollback ? result.type - 1 : result.type + 1

      await service.task.updateDataById(id, { type })
      //积分更新
      await service.rank.updateRank(rollback)
      const msg = rollback ? '积分扣除10分~' : '真棒！积分增加10分'
      ctx.print = { msg }
    } else {
      const { date, content, count, partner } = ctx.request.body
      await service.task.updateDataById(id, {
        createdAt: date,
        content,
        count,
        partner
      })
      const msg = '更新成功'
      ctx.print = { msg }
    }
  }
}

module.exports = TaskController
