module.exports = (sequelize, DataTypes) => {

    let alias = 'Model';

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
        tableName: 'models'
    };

    const Model = sequelize.define(alias, cols, config)

    Model.associate = function (models) {
        Model.hasMany(
            models.Product, {
                as: 'products',
                foreignKey: 'modelId'
            }
        )
    }

    return Model;


}