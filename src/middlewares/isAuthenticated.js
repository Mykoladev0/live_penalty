module.exports = function (req, res, next) {
    return (this.passport.authenticate('bearer', {
        session: false
    }))(req, res, next);
}
