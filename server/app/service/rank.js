'use strict'

const Service = require('egg').Service

class Rank extends Service {


    async findAll() {
        const { ctx } = this
        return ctx.model.Rank.findAll()
    }

}

module.exports = Rank
