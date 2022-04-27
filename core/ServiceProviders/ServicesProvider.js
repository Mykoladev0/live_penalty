module.exports = class ServicesProvider {
    constructor(app) {
        this.app = app;
    }

    boot() {
        const fs = require('fs');

        this.app['services'] = [];

        const servicesPath = `${this.app.__basedir}/src/services`;
    
        fs.readdirSync(servicesPath).forEach(file => {
            const broken = file.split('.');
            const serviceName = `${broken[0]}`;

            this.app['services'][serviceName] = new (require(`${servicesPath}/${file}`))(this.app);
        });
    }
}
