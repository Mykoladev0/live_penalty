'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING(254),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(72),
            allowNull: false
        },
    }, {
        freezeTableName: true,
        tableName: 'users',
        underscored: true,
        timestamps: true,
    });

    User.associate = function (models) {
        User.hasMany(models.Token, {
            foreignKey: 'user_id'
        })
    };

    return User;
};
