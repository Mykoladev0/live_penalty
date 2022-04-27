const { Sequelize } = require('sequelize');

module.exports = {
    up: ({ context: queryInterface }) => {
        return queryInterface.createTable('users', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            email: {
                type: Sequelize.STRING(254),
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.STRING(72),
                allowNull: false
            },
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE,
        });
    },
    down: ({ context: queryInterface }) => queryInterface.dropTable('users'),
};
