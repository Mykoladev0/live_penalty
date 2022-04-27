const fs = require('fs');
const expressValidator = require('express-validator');

module.exports = class ActionsProvider {
    constructor(app) {
        this.app = app;
    }

    boot() {
        this.app['actions'] = [];
        const actionsPath = `${this.app.__basedir}/src/actions`;

        this.readAndLoadActions(this.app['actions'], actionsPath);
    }

    readAndLoadActions(container, directory) {
        fs.readdirSync(directory).forEach(file => {
            const stats = fs.lstatSync(`${directory}/${file}`);

            if (stats.isDirectory()) {
                container[file] = [];

                return this.readAndLoadActions(container[file], `${directory}/${file}`)
            }

            const handlerFunction = require(`${directory}/${file}`);
            const validations = require(`${directory}/${file}`).validations;

            const handler = (req, res, next) => {
                const handler = handlerFunction.bind(
                    this.app
                );

                if (handler?.constructor?.name === 'AsyncFunction') {
                    return handler(req, res, next).catch(next);
                }

                return (async (req, res, next) => {
                    return handler(req, res, next);
                })(req, res, next).catch(next);
            };

            return container[file.split('.')[0]] = [
                loadValidations(validations),
                this.app.middlewares.requestValidator,
                handler
            ];
        });
    }
}

const loadValidations = validations => {
    if (typeof validations === 'function') {
        const validatiosResult = validations(expressValidator);

        if (Array.isArray(validatiosResult)) {
            return validatiosResult;
        }
    }

    return [];
};
