module.exports = (sequelize, DataTypes) => {

    let alias = 'Component';

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false
        },
        brandId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        typeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };

    // let config = {}
    // 3er parametro de products
    // tableName: si el alias no es el mismo nombre de la tableName
    // timestamps:false, si no los agregamos en la tabla, create update o deleteAt
    let config = {
        tableName: 'components'
    };

    const Component = sequelize.define(alias, cols, config)

    Component.associate = function (models) {
        Component.belongsToMany(models.Product, {
            as: 'products',
            through: 'componentproducts',
            foreignKey: 'productId',
            otherKey: 'componentId'
        })
        Component.belongsToMany(models.Atribute, {
            as: 'atributes',
            through: 'atributecomponents',
            foreignKey: 'atributeId',
            otherKey: 'componentId'
        })
        Component.belongsTo(models.Brand, {
            as: 'brands',
            foreignKey: 'brandId',
        })
        Component.belongsTo(models.Type, {
            as: 'type',
            foreignKey: 'typeId',
        })

    }

    return Component;


}