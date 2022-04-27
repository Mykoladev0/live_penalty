const bcrypt = require('bcrypt');

module.exports = {
    up: async ({ context: queryInterface }) => {
        const saltRounds = 8;

        return queryInterface.bulkInsert('users', [
            {
                email: 'user@test.com',
                password: await bcrypt.hash('word2P@ss', saltRounds),
                created_at: new Date(),
                updated_at: new Date()
            },
        ], {});
    },

    down: ({ context: queryInterface }) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};
