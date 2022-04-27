const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

module.exports = class Database {
    constructor(app) {
        this.app = app;
        this.Sequelize = Sequelize;
        this.dbConfig = require(path.join(this.app.__basedir, 'src', 'config', 'database.js'))(this.app.env);
        this.sequelize = new Sequelize(
            this.dbConfig.database, 
            this.dbConfig.username, 
            this.dbConfig.password, 
            this.dbConfig.options
        );
        this.db = {};

        this.bootstrap();
    }

    bootstrap() {
        this.readAndLoadModels();
        this.loadAssosiations();
        this.loadInAppModels();
    }

    readAndLoadModels() {
        fs
            .readdirSync(path.join(this.app.__basedir, 'database', 'models'))
            .filter(file => {
                return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
            })
            .forEach(file => {
                const model = require(path.join(this.app.__basedir, 'database', 'models', file))(this.sequelize, Sequelize.DataTypes);
                this.db[model.name] = model;
            });
    }

    loadAssosiations() {
        Object.keys(this.db).forEach(modelName => {
            if (this.db[modelName].associate) {
                this.db[modelName].associate(this.db);
            }            
        });
    }

    loadInAppModels() {
        this.app.db = {};
        this.app.db.$op = Sequelize.Op;
        this.app.db.sequelize = this.sequelize;

        this.app.models = {};

        Object.keys(this.db).forEach(modelName => {
            this.app.models[modelName] = this.db[modelName];        
        });
    }
}
