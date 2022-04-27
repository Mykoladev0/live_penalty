module.exports = function(middlewares) {
    return {
        global: [
            require('compression')(),
            require('morgan')('dev'),
            require('cookie-parser')(),
            require('passport').initialize(),
            middlewares.cors,
        ],
        after: [
            middlewares.routeNotFound,
            middlewares.globalErrorHandler
        ]
    }
};
