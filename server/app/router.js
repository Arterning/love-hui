'use strict'

const asset_type = require('./model/asset_type')

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app
  const userRequired = middleware.userRequired()
  const {
    common,
    system,
    task,
    reminder,
    capitalFlowType,
    capitalFlow,
    memorandum,
    innerMessage,
    todoList,
    assetController,
    company,
    log
  } = controller

  require('./router/user')(app)
  require('./router/user_configure')(app)

  router.get('/', common.index)
  router.post('/register', common.createUser)

  // 公共接口
  router.get('/api/captcha', common.captcha)
  router.get('/api/panel', userRequired, common.getPanelData)

  // 系统
  router.get('/api/system/info', userRequired, system.index)

  // 今日待办
  router.resources('task', '/api/task', userRequired, task)

  // 提醒事项
  router.resources('reminder', '/api/reminder', userRequired, reminder)

  // 资金流动类型
  router.resources('capitalFlowType', '/api/capitalFlowType', userRequired, capitalFlowType)

  // 资产类型
  router.resources('asset', '/api/asset', userRequired, assetController)

  // 资金流动
  router.resources('capitalFlow', '/api/capitalFlow', userRequired, capitalFlow)
  router.get('/api/capitalFlow/amount/statistics', userRequired, capitalFlow.sumAmount)
  router.get('/api/capitalFlow/amount/group', userRequired, capitalFlow.amountGroup)

  // 备忘录
  router.resources('memorandum', '/api/memorandum', userRequired, memorandum)

  // 站内消息
  router.resources('innerMessage', '/api/innerMessage', userRequired, innerMessage)

  // 活动清单
  router.resources('todoList', '/api/todoList', userRequired, todoList)

  // 公司单位
  router.resources('company', '/api/company', userRequired, company)

  // 日志管理
  router.resources('log', '/api/log', userRequired, log)
}
