const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const LocalStrategy = require('passport-local').Strategy;

module.exports = class PassportService {
    constructor(app) {
        this.app = app;
        passport.use(new BearerStrategy(this.findByToken.bind(this.app)));
        passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        }, this.validateCredentials.bind(this.app)));

        this.app.passport = passport;
    }

    findByToken(token, done) {
        this.services.auth.verify(token, {}, (err, payload) => {
            if (err) {
                return done(err);
            }

            this.models.User.findOne({
                where: {
                    email: payload.email
                },
                attributes: {
                    exclude: ['password']
                }
            }).then(user => {
                done(null, user);
            }).catch(done)
        });
    }

    async validateCredentials(email, password, next) {
        try {
            const user = await this.models.User.findOne({
                where: {
                    email,
                },
                attributes: ['id', 'first_name', 'last_name', 'email', 'password', 'role', 'preferences']
            });

            if (!user) {
                return next(
                    {
                        message: 'Invalid Credentials.'
                    },
                    false
                );
            }

            const passwordMatched = await this.helpers.compareHash(password, user.password);
            
            if (!passwordMatched) {
                return next(
                    {
                        message: 'Invalid Credentials.'
                    },
                    false
                );
            }

            return next(
                null,
                {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    user_name: user.user_name,
                    preferences: user.preferences,
                },
                {
                    message: 'Logged In Successfully'
                }
            );
        } catch (err) {
            return next(
                err,
                false
            );
        }
    }
}
