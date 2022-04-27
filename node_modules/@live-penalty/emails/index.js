module.exports = class EmailsProvider {
    constructor(app) {
        this.app = app;
    }

    boot() {
        const fs = require('fs');

        this.app['emails'] = [];

        const emails = `${this.app.__basedir}/src/emails`;
    
        fs.readdirSync(emails).forEach(file => {
            const broken = file.split('.');
            const emailName = `${broken[0]}`;

            this.app['emails'][emailName] = new (require(`${emails}/${file}`))(this.app);
        });
    }
}

module.exports.Email = require('./src/Email');
