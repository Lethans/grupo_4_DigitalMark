module.exports = (sequelize, DataTypes) => {

    let alias = 'CartProduct';

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
        salePrice: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        subTotal: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        state: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sellerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cartId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };
    let config = {
        tableName: 'cartproducts'
    };

    const CartProduct = sequelize.define(alias, cols, config)

    CartProduct.associate = function (models) {
        CartProduct.belongTo(
            model.Product, {
                as: 'product',
                foreignKey: 'productId'
            }
        )
    }

    CartProduct.associate = function (models) {
        CartProduct.belongsTo(
            models.User, {
                as: 'user',
                foreignKey: 'userId'
            }
        )
    }
    CartProduct.associate = function (models) {
        CartProduct.belongsTo(
            models.Cart, {
                as: 'cart',
                foreignKey: 'cartId'
            }
        )
    }

    return CartProduct;


}