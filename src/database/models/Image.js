module.exports = (sequelize,DataTypes) => {

    let alias = 'Image';

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        filename: {
            type: DataTypes.STRING,
            allowNull: false
        }
    };
    let config = {
        tableName: 'images'
    };

    const Image = sequelize.define(alias, cols, config)

    Image.associate = function (models) {
        Image.belongsToMany(models.Product, {
            as: 'products',
            through: 'imageproduct',
            foreignKey: 'productsId',
            otherKey: 'imageId'
        })
    }

    return Image;


}