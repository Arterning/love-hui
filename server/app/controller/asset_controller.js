'use strict'

const Controller = require('egg').Controller

class AssetController extends Controller {


    async index() {
        const { ctx, service } = this
        const result = service.assetService.findAndCountAll()
        ctx.print = {result, message: "good job man"}
    }

    async create() {
        const { ctx, service } = this

        const { name, type } = ctx.request.body
        const data = { name, type }

        service.assetService.create(data)
    }

    async update() {
        const { ctx, service } = this
        const id = ctx.params.id

        const { name, type } = ctx.request.body
        const updateFields = { name, type }

        service.assetService.updateById(id, updateFields)
    }

    async destroy() {
        const { ctx, service } = this
        const id = ctx.params.id
    
        try {
          const result = await service.assetService.deleteById(id)
          ctx.print = { ...result, msg: '删除成功' }
        } catch {
          ctx.print = { errorCode: 4 }
        }
    }
}

module.exports = AssetController