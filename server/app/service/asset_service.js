'use strict'

const Service = require('egg').Service
const dayjs = require('dayjs')

class AssetService extends Service {

    async findAndCountAll() {
        const { ctx } = this
        const uid = ctx.user.uid
        return ctx.model.Asset.findAndCountAll({
          where: { uid }
        })
    }


    async create(data) {
        const { ctx } = this
        const uid = ctx.user.uid
        return ctx.model.Asset.create({ uid, ...data })
    }

    async updateById(id, updateFields) {
        const { ctx } = this
        const uid = ctx.user.uid
        return ctx.model.Asset.update(updateFields, {
          where: { uid, id }
        })
    }

    async deleteById(id) {
        const { ctx } = this
        const uid = ctx.user.uid
        id = String(id).split(',')
        return ctx.model.Asset.destroy({ where: {
          uid,
          id: {
            [ctx.Op.in]: id
          }
        } })
    }

}

module.exports = AssetService