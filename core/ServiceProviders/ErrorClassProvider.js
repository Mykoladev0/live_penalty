module.exports = class ErrorClassProvider {
    constructor(app) {
        this.app = app;
    }

    boot() {
        const fs = require('fs');

        this.app['errors'] = [];

        const errorsPath = `${this.app.__basedir}/src/errors`;
    
        fs.readdirSync(errorsPath).forEach(file => {
            const broken = file.split('.');
            const helperName = `${broken[0]}`;

            this.app['errors'][helperName] = require(`${errorsPath}/${file}`);
        });
    }
}
