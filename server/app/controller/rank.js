const Controller = require('egg').Controller

class Rank extends Controller {

    async index() {
        const { ctx, service, app } = this
        const result = await service.rank.findAll()
        console.log(result)
        ctx.print = result
    }


}

module.exports = Rank
