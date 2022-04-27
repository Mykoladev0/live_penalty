module.exports = function (req, res, next) {
    this.passport.authenticate('local', async (err, user, info) => {
        if (err || !user) {
            return next(new this.errors.BadRequestError(err || info));
        }

        const token = this.services.auth.issueJWT({
            id: user.id,
            email: user.email,
            role: user.role,
        });

        return res.json({
            message: info.message,
            user: user,
            token: token
        });
    })(req, res, next);
}

module.exports.validations = ({ body }) => {
    return [
        body('email').isEmail().normalizeEmail(),
        body('password').trim().isLength(8),
    ];
};
