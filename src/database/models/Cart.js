module.exports = (sequelize,DataTypes) => {

    let alias = 'Cart';

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        orderNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };

    // let config = {}
    // 3er parametro de products
    // tableName: si el alias no es el mismo nombre de la tableName
    // timestamps:false, si no los agregamos en la tabla, create update o deleteAt
    let config = {
        tableName: 'carts'
    };
    const Cart = sequelize.define(alias, cols, config)

    Cart.associate = function (models) {
        Cart.belongsTo(
            models.User, {
                as: 'user',
                foreignKey: 'userId'
            }
        )
    }

    return Cart;


}