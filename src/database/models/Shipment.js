module.exports = (sequelize,DataTypes) => {

    let alias = 'Shipment';

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        }
    };
    let config = {
        tableName: 'shipments'
    };

    const Shipment = sequelize.define(alias, cols, config)


    return Shipment;


}