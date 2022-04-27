module.exports = async function (req, res) {
    let {
        first_name,
        last_name,
        email,
        password
    } = req.body;

    const user = await this.services.user.createUser({
        first_name,
        last_name,
        email,
        password
    });

    this.emails.Welcome.sendEmail({ user });

    const token = this.services.auth.issueJWT({
        id: user.id,
        email: user.email,
        role: user.role,
    });

    return res.json({
        user: {
            user_name: user.user_name,
            email: user.email,
            role: user.role,
            preferences: user.preferences,
        },
        token
    });
}

module.exports.validations = ({ body }) => {
    return [
        body('first_name').not().isEmpty().trim().escape(),
        body('last_name').not().isEmpty().trim().escape(),
        body('email').isEmail().normalizeEmail(),
        body('password').trim().isLength(8),
    ];
};
