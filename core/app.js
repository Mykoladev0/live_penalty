const path = require('path');

module.exports = class Application {
    constructor() {
        this.core = {};
        this.__basedir = path.join(__dirname, '..');
    }

    bootstrap() {
        this._ = require('lodash');
        (new (require('./ServiceProviders'))(this)).boot();

        return this;
    }

    expressConfig(cb) {
        this.core.app.config(cb);
    }

    start() {
        this.core.app.listen();
    }
}
