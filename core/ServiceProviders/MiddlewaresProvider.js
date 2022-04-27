module.exports = class MiddlewaresProvider {
    constructor(app) {
        this.app = app;
    }

    boot() {
        const fs = require('fs');

        this.app['middlewares'] = [];

        const middlewaresPath = `${this.app.__basedir}/src/middlewares`;
    
        fs.readdirSync(middlewaresPath).forEach(file => {
            const broken = file.split('.');
            const middlewareName = `${broken[0]}`;

            this.app['middlewares'][middlewareName] = require(`${middlewaresPath}/${file}`).bind(
                this.app
            );
        });
    }
}
