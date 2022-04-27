module.exports = (routes, actions) => {
    routes.register({
        api: false
    }, (router) => {
        router.get('/ping', actions.web.ping);
    });
}
