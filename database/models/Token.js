'use strict';
module.exports = (sequelize, DataTypes) => {
    const Token = sequelize.define('Token', {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM(['RESET_PASSWORD']),
            defaultValue: 'RESET_PASSWORD'
        },
        token: {
            type: DataTypes.STRING(36),
            allowNull: false,
        },
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
    }, {
        freezeTableName: true,
        tableName: 'tokens',
        underscored: true,
        timestamps: true,
    });
   
    Token.associate = function (models) {
        Token.belongsTo(models.User, {
            foreignKey: 'user_id'
        });
    };
   
    return Token;
};
