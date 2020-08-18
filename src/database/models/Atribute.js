module.exports = (sequelize, DataTypes) => {

    let alias = 'Atribute';

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
        }
    };

    // let config = {}
    // 3er parametro de products
    // tableName: si el alias no es el mismo nombre de la tableName
    // timestamps:false, si no los agregamos en la tabla, create update o deleteAt
    let config = {
        tableName: 'atributes'
    };

    const Atribute = sequelize.define(alias, cols, config)

    Atribute.associate = function (models) {
        Atribute.belongsToMany(models.Component, {
            as: 'components',
            through: 'atributecomponents',
            foreignKey: 'componentsId',
            otherKey: 'atributeId'
        })
    }

    return Atribute;


}