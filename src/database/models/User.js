module.exports = (sequelize, DataTypes) => {

    let alias = 'User';

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rolId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };
    let config = {
        tableName: 'users'
    };

    const User = sequelize.define(alias, cols, config)

    User.associate = function (models) {
        User.belongsTo(
            models.Rol, {
                as: 'rol',
                foreignKey: 'rolId'
            }
        )
    }

    return User;


}