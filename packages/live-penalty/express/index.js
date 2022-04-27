module.exports = class ExpressProvider {
    constructor(app) {
        this.app = app;
    }

    boot() {
        this.app.core.app = new (require('./src/app'))(this.app);
        this.app.routes = new (require('./src/routes'))(this.app, this.app.core.app.express);
    }
}
