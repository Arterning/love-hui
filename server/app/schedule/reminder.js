const Subscription = require('egg').Subscription

class Reminder extends Subscription {
  static get schedule() {
    return {
      interval: '60s',
      type: 'all',
      immediate: true
    }
  }

  async subscribe() {
    const { service } = this
    //暂时不需要发送邮件
    //await service.mail.sendReminder()
  }
}

module.exports = Reminder
