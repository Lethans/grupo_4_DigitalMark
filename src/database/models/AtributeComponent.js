//AtributeComponents

module.exports = (sequelize, DataTypes) => {

    let alias = 'AtributeComponent';

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        componentId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        atributeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };
    let config = {
        tableName: 'atributecomponents'
    };

    const AtributeComponent = sequelize.define(alias, cols, config)

    AtributeComponent.associate = function (models) {
        AtributeComponent.belongsTo(
            models.Component, {
                as: 'component',
                foreignKey: 'componentId'
            }
        )

        AtributeComponent.belongsTo(
            models.Atribute, {
                as: 'atribute',
                foreignKey: 'atributeId'
            }
        )
    }

    return AtributeComponent;


}