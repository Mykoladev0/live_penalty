module.exports = async function (req, res) {
    let { token } = req.params;

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

    return res.json({});
}
