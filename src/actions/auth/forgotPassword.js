module.exports = async function (req, res) {
    const email = req.body.email;

    const user = await this.models.User.findOne({
        attributes: ['id', 'email'],
        where: { email }
    });

    if (!user) {
        return res.json({});
    }

    const token = this.helpers.uuid();

    await this.models.Token.destroy({
        where: {
            user_id: user.id,
            type: 'RESET_PASSWORD'
        }
    });

    await this.models.Token.create({
        user_id: user.id,
        token,
        type: 'RESET_PASSWORD'
    });

    this.emails.ForgotPassword.sendEmail({
        user,
        link: `${token}`
    });

    return res.json({});
}

module.exports.validations = ({ body }) => {
    return [
        body('email').isEmail().normalizeEmail(),
    ];
};
