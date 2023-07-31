'use strict'

const Service = require('egg').Service

class Rank extends Service {


    async findAll() {
        const {ctx} = this
        return ctx.model.Rank.findAll()
    }

    async updateRank(rollback, partner) {
        const {ctx} = this
        const find = await ctx.model.Rank.findOne({
            where: {
                uid: partner
            }
        })
        const score = rollback ? find.score - 10 : find.score + 10
        ctx.model.Rank.update({score}, {
            where: {
                uid: partner
            }
        })
    }

}

module.exports = Rank
