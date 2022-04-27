const path = require('path');

module.exports = class Routes {
    constructor(app, expressApp) {
        this.app = app;
        this.expressApp = expressApp;

        this.loadWebRoutes();
        this.loadApiRoutes();

        require(path.join(this.app.__basedir, 'src', 'config', 'middlewares.js'))(this.app.middlewares)[
            'after'
        ].forEach(middleware => {
            this.expressApp.use(middleware);
        });
    }

    register(options, cb) {
        const router = require('express').Router();

        cb(router);

        const prefix = options?.prefix || '';
        const isAPI = options?.api ?? true; 
        const middlewares = options?.middlewares || [];
        const path = `/${isAPI ? 'api/' : ''}${prefix ? `${prefix}/` : ''}`;
        
        this.expressApp.use(require('express').json({ limit: '5MB' }));
        this.expressApp.use(require('express').urlencoded({ extended: false }));
        
        this.expressApp.use(
            path,
            middlewares,
            router
        );
    }

    loadWebRoutes() {
        const webRoutesFile = path.join(this.app.__basedir, 'src', 'routes', 'web.routes.js');
        require(webRoutesFile)(this, this.app.actions, this.app.middlewares);
    }

    loadApiRoutes() {
        const apiRoutesFile = path.join(this.app.__basedir, 'src', 'routes', 'api.routes.js');
        require(apiRoutesFile)(this, this.app.actions, this.app.middlewares);
    }
}
