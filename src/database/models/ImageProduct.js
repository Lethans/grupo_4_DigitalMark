module.exports = (sequelize,DataTypes) => {

    let alias = 'ImageProduct';

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
        imageId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };
    let config = {
        tableName: 'imageproduct'
    };

    const ImageProduct = sequelize.define(alias, cols, config)

    ImageProduct.associate = function (models) {
        ImageProduct.belongsTo(
            models.Product, {
                as: 'product',
                foreignKey: 'productId'
            }
        )
    }
    ImageProduct.associate = function (models) {
        ImageProduct.belongsTo(
            models.Image, {
                as: 'image',
                foreignKey: 'imageId'
            }
        )
    }

    return ImageProduct;


}