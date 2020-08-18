module.exports = (sequelize, DataTypes) => {

    let alias = 'ComponentProduct';

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false
        }
    };
    let config = {
        tableName: 'componentproducts'
    };

    const ComponentProduct = sequelize.define(alias, cols, config)

    ComponentProduct.associate = function (models) {
        ComponentProduct.belongsTo(
            models.Product, {
                as: 'product',
                foreignKey: 'productId'
            }
        )
        ComponentProduct.belongsTo(
            models.Component, {
                as: 'component',
                foreignKey: 'componentId'
            }
        )
    }


    return ComponentProduct;

}