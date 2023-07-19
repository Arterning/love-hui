module.exports = app => {
    const { INTEGER, STRING, UUID, UUIDV4 } = app.Sequelize

    return app.model.define('rank', {
        id: {
            type: UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            comment: '唯一ID'
        },
        uid: {
            type: INTEGER,
            allowNull: false,
            comment: '用户ID',
        },
        name: {
            type: STRING(50),
            allowNull: false,
            defaultValue: '',
            comment: '用户姓名'
        },
        score: {
            type: STRING(66),
            allowNull: false,
            defaultValue: '0',
            comment: '积分数目'
        },
        color: {
            type: STRING(10),
            allowNull: true,
            defaultValue: 'orange',
            comment: '颜色'
        },
    }, {
        underscored: true,
        comment: '积分排名',
        charset: 'utf8mb4',
        engine: 'InnoDB'
    })
}
