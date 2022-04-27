module.exports = function (req, res, next) {
    next(new this.errors.NotFoundError({
        message: 'Route not found!'
    }));
}
