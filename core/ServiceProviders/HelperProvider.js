module.exports = class HelperProvider {
    constructor(app) {
        this.app = app;
    }

    boot() {
        const fs = require('fs');

        this.app['helpers'] = [];

        const helpersPath = `${this.app.__basedir}/src/helpers`;
    
        fs.readdirSync(helpersPath).forEach(file => {
            const broken = file.split('.');
            const helperName = `${broken[0]}`;

            this.app['helpers'][helperName] = require(`${helpersPath}/${file}`).bind(
                this.app._.omit(
                    this.app, 
                    'core'
                )
            );
        });
    }
}
