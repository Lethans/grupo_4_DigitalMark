module.exports = (sequelize, DataTypes) => {

    let alias = 'Order';

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        cartId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        paymentId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        shipmentId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };
    let config = {
        tableName: 'orders'
    };

    const Order = sequelize.define(alias, cols, config)

    Order.associate = function (models) {
        Order.belongTo(
            model.Cart, {
                as: 'cart',
                foreignKey: 'cartId'
            }
        )
    }
    Order.associate = function (models) {
        Order.belongsTo(
            models.PaymentMethods, {
                as: 'paymentmethod',
                foreignKey: 'paymentmethodId'
            }
        )
    }
    Order.associate = function (models) {
        Order.belongsTo(
            models.Shipment, {
                as: 'shipment',
                foreignKey: 'shipmentId'
            }
        )
    }

    return Order;


}