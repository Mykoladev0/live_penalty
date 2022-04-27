module.exports = async function (req, res) {
    let { password, token } = req.body;

    password = await this.helpers.makeHash(password?.trim());

    token = await this.models.Token.findOne({
        where: {
            token,
            type: 'RESET_PASSWORD',
            created_at: {
                [this.db.$op.gt]: new Date(Date.now() - (Number(this.env.FORGOT_EMAIL_EXPIRY || 60 * 30) * 1000)),
            }
        }
    });

    if (!token) {
        throw new this.errors.BadRequestError('Reset token is not valid!');
    }

    await Promise.all([
        this.models.User.update({
            password
        }, {
            where: {
                id: token.user_id
            }
        }),
        this.models.Token.destroy({
            where: {
                type: 'RESET_PASSWORD',
                user_id: token.user_id
            }
        })
    ]);

    return res.json({});
}

module.exports.validations = ({ body }) => {
    return [
        body('token').not().isEmpty().trim(),
        body('password').trim().isLength(8),
    ];
};
