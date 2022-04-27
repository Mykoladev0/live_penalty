module.exports = class LoggingProvider {
    constructor(app) {
        this.app = app;
    }

    boot() {
        this.app.logger = new (require('./src/logger'))(this.app);
    }
}