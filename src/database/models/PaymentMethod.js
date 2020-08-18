module.exports = (sequelize,DataTypes) => {

    let alias = 'PaymentMethod';

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        method: {
            type: DataTypes.STRING,
            allowNull: false
        }
    };
    let config = {
        tableName: 'paymentmethods'
    };

    const PaymentMethod = sequelize.define(alias, cols, config)


    return PaymentMethod;


}