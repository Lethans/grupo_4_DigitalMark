module.exports = (sequelize, DataTypes) => {

    let alias = 'Type';

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    };
    let config = {
        tableName: 'types'
    };

    const Type = sequelize.define(alias, cols, config)

    Type.associate = function (models) {
        Type.hasMany(models.Component, {
            as: 'components',
            foreignKey: 'typeId',
        })
    }
    return Type;


}