const Sequelize = require('sequelize');

module.exports = {
    up: async ({ context: queryInterface }) => {
        return queryInterface.createTable('tokens', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            type: {
                type: Sequelize.ENUM(['RESET_PASSWORD']),
                defaultValue: 'RESET_PASSWORD'
            },
            token: {
                type: Sequelize.STRING(36),
                allowNull: false,
            },
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE,
        });
    },

    down: async ({ context: queryInterface }) => {
        return queryInterface.dropTable('tokens');
    }
};
