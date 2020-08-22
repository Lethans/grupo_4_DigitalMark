module.exports = (sequelize, DataTypes) => {

    let alias = 'Brand';

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
        logo: DataTypes.STRING
    };

    let config = {
        tableName: 'brands'
    };

    const Brand = sequelize.define(alias, cols, config)

    Brand.associate = function (models) {
        Brand.hasMany(
            models.Product, {
                as: 'products',
                foreignKey: 'brandId'
            }
        )
        Brand.hasMany(models.Component, {
            as: 'components',
            foreignKey: 'brandId',
        })
    }

    return Brand;


}