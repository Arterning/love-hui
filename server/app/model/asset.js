module.exports = app => {

  const { INTEGER, STRING, TINYINT, UUIDV4, UUID } = app.Sequelize

  const Schema = app.model.define('asset', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      comment: '唯一ID'
    },
    uid: {
      type: INTEGER,
      allowNull: false,
      comment: '用户ID'
    },
    sortIndex: {
      type: TINYINT,
      defaultValue: 0,
      allowNull: false,
      comment: '排序'
    },
    name: {
      type: STRING(20),
      allowNull: false,
      defaultValue: '资产名称',
      comment: '资产名称',
    },
    price: {
        type: STRING(20),
        allowNull: false,
        defaultValue: '资产估值',
        comment: '资产估值',
    },
    assetType: {
        type: UUID,
        allowNull: false,
        defaultValue: '资产类型',
        comment: '资产类型',
    }
  })

  return Schema

}