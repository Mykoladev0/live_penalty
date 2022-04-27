module.exports = function(err, req, res, next) {
    if (res.headersSent) {
        /**
         * TODO: Log error in case headers have already been sent
         */
        return;
    }

    if (typeof err.handle === 'function') {
        return err.handle({ req, res, next });
    }

    return res.status(500).json({
        message: err.message
    });
}
