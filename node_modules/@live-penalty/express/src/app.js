const path = require('path');

module.exports = class Application {
    constructor(app) {
        this.app = app;
        this.port = this.normalizePort(this.app.env.PORT || 8000);
        this.Express = require('express');
        this.express = this.Express();
        this.http = require('http');

        this.loadGlobalMiddlewares();
    }

    loadGlobalMiddlewares() {
        require(path.join(this.app.__basedir, 'src', 'config', 'middlewares.js'))(this.app.middlewares)[
            'global'
        ].forEach(middleware => {
            this.express.use(middleware);
        });
    }

    config(cb) {
        cb(this.express);
    }

    listen() {
        this.express.set('port', this.port);
        this.app.core.server = this.http.createServer(this.express);
        this.app.core.server.listen(this.port);
        this.app.core.server.on('error', this.onError.bind(this));
        this.app.core.server.on('listening', this.onListening.bind(this));
    }

    normalizePort(val) {
        const port = parseInt(val, 10);

        if (isNaN(port)) {
            // named pipe
            return val;
        }

        if (port >= 0) {
            // port number
            return port;
        }

        return false;
    }

    onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                this.app.logger.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                this.app.logger.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    onListening() {
        const addr = this.app.core.server.address();
        const bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        this.app.logger.info('Listening on ' + bind);
    }
}
