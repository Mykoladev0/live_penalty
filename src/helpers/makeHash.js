const bcrypt = require('bcrypt');

module.exports = function(password) {
    const saltRounds = 8;

    return bcrypt.hash(password, saltRounds);
}

