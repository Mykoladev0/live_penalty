module.exports = class EnvProvider {
    constructor(app) {
        this.app = app;
    }

    boot() {
        this.dotenv = require('dotenv');   
        this.dotenv.config();
        this.app.env = process.env;
    }
}