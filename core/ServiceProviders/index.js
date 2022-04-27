const path = require('path');

module.exports = class ServiceProviders {
    constructor(app) {
        this.app = app;

        this.providers = {
            'env': require('./EnvProvider'),
            'logger': require('@live-penalty/logger'),
            'errors': require('./ErrorClassProvider'),
            'helpers': require('./HelperProvider'),
            'services': require('./ServicesProvider'),
            'middlewares': require('./MiddlewaresProvider'),
            'actions': require('./ActionsProvider'),
            'emails': require('@live-penalty/emails'),
            'database': require('@live-penalty/database'),
            'express': require('@live-penalty/express'),
            ...require(path.join(this.app.__basedir, 'src', 'config', 'providers.js'))
        };

        Object.keys(this.providers).forEach((provider) => {
            this.providers[provider] = new this.providers[provider](this.app);
        });
    }

    boot() {
        Object.keys(this.providers).forEach((provider) => {
            if (typeof this.providers[provider].boot === 'function') {
                this.providers[provider].boot();
            }
        });

        this.app.core.providers = this.providers;
    }
}
