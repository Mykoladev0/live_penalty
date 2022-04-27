const bcrypt = require('bcrypt');

module.exports = function(password, hash) {
    return bcrypt.compare(password, hash);
}

