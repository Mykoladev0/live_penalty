module.exports = class Logger {
    constructor(app) {
        this.app = app;
    }

    log(...any) {
        if (parseInt(this.app.env.DEBUG)) {
            console.log(...any);
        }   
    }

    error(...any) {
        if (parseInt(this.app.env.DEBUG)) {
            console.error(...any);
        }   
    }

    info(...any) {
        if (parseInt(this.app.env.DEBUG)) {
            console.info(...any);
        }   
    }
}