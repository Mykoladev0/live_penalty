module.exports = function (routes, actions, middlewares) {
    routes.register({
        prefix: 'auth',
    }, (router) => {
        router.post('/register', actions.auth.register);
        router.post('/login', actions.auth.login);
        router.post('/forgot-password', actions.auth.forgotPassword);
        router.get('/verify-token/:token', actions.auth.verifyCode);
        router.put('/reset-password', actions.auth.resetPassword);
    });

    routes.register({
        prefix: 'me',
        middlewares: [
            middlewares.isAuthenticated
        ]
    }, (router) => {
        router.get('/', actions.me.userDetails);
    });
}
