const jwt = require('jsonwebtoken');

module.exports = class AuthService {
    constructor(app) {
        this.app = app;
    }

    issueJWT(payload = {}, options = {}) {
        return jwt.sign(payload, this.app.env.TOKEN_SECRET, {
            expiresIn: Number(this.app.env.MAX_TOKEN_AGE) || 3600,
            ...options
        });
    }

    verify(token, options = {}, next) {
        return jwt.verify(
            token,
            this.app.env.TOKEN_SECRET,
            options,
            next
        );
    }

    decode(token, options = {}) {
        return jwt.decode(token, options);
    }
}


