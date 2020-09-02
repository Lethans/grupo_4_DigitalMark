// const { sequelize } = require("."); //por si hay error 
// const {
//     DataTypes
// } = require("sequelize/types");

module.exports = (sequelize, DataTypes) => {

    let alias = 'Product';

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
        },
        brandId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        modelId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        oldPrice: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        discount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        outstanding: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    };

    // let config = {}
    // 3er parametro de products
    // tableName: si el alias no es el mismo nombre de la tableName
    // timestamps:false, si no los agregamos en la tabla, create update o deleteAt
    let config = {
        tableName: 'products'
    };

    const Product = sequelize.define(alias, cols, config)

    Product.associate = function (models) {
        Product.belongsTo(
            models.Brand, {
                as: 'brand',
                foreignKey: 'brandId'
            }
        )
        Product.belongsTo(
            models.Model, {
                as: 'model',
                foreignKey: 'modelId'
            }
        )
        Product.belongsToMany(models.Component, {
            as: 'components',
            through: 'componentproducts',
            foreignKey: 'productId',
            otherKey: 'componentId'
        })
        Product.belongsToMany(models.Image, {
            as: 'image',
            through: 'imageproduct',
            foreignKey: 'productId',
            otherKey: 'imageId'
        })
    }


    return Product;


}