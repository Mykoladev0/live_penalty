module.exports = class DBProvider {
    constructor(app) {
        this.app = app;
    }

    boot() {
        this.app.core.database = new (require('./src/sequelize'))(this.app);
    }
}
