module.exports = (sequelize,DataTypes) => {

    let alias = 'Rol';

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        label: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };
    let config = {
        tableName: 'rols'
    };

    const Rol = sequelize.define(alias, cols, config)
    
    Rol.associate = function (models) {
        Rol.hasMany(
            models.User, {
                as: 'user',
                foreignKey: 'rolId'
            }
        )
    }

    return Rol;


}