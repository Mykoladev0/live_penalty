const nodemailer = require('nodemailer');

module.exports = class Email {
    constructor({
        app = null,
        subject = '',
    }) {
        this.app = app;
        this.subject = subject;

        this.createTransportInstance();
    }

    async createTransportInstance() {
        let credentials = {
            user: this.app.env.EMAIL_USER,
            pass: this.app.env.EMAIL_PASS,
        };

        if (this.app.env.TEST_EMAIL_SERVICE) {
            credentials = await nodemailer.createTestAccount();
        }

        this.transporter = nodemailer.createTransport({
            host: this.app.env.TEST_EMAIL_SERVICE ? "smtp.ethereal.email" : this.app.env.EMAIL_HOST,
            port: parseInt(this.app.env.EMAIL_PORT, 10) || 587,
            secure: !!this.app.env.EMAIL_SECURE || false,
            auth: {
                user: credentials.user,
                pass: credentials.pass,
            },
        });
    }

    async send({
        from,
        to,
        subject,
        text,
        html,
    }) {
        let info = await this.transporter.sendMail({
            from: from || this.app.env.EMAIL_FROM,
            to: to,
            subject: subject || this.subject,
            ...(_ => {
                if (text) {
                    return {
                        text,
                    };
                }

                return {
                    html,
                };
            })()
        });

        this.app.logger.log("Message sent: %s", info.messageId);
        this.app.logger.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        return info;
    }
}
