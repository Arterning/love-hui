'use strict'

const Service = require('egg').Service

class Rank extends Service {


    async findAll() {
        const {ctx} = this
        return ctx.model.Rank.findAll()
    }

    async updateRank(rollback) {
        const {ctx} = this
        const uid = ctx.user.uid
        const find = await ctx.model.Rank.findOne({
            where: {
                uid
            }
        })
        const score = rollback ? find.score - 10 : find.score + 10
        ctx.model.Rank.update({score}, {
            where: {
                uid
            }
        })
    }

}

module.exports = Rank
