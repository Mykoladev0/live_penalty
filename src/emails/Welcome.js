const Email = require('@live-penalty/emails').Email;

module.exports = class WelcomeEmail extends Email {
    constructor(app) {
        super({
            app,
            subject: 'Welcome to live-penalty',
        });
    }

    sendEmail({ user }) {
        const html = this.generateTemplate({ user });

        return this.send({
            to: user?.email,
            html,
        });
    }

    generateTemplate({ user }) {
        return `
            <html>
                <h3>Hi ${user?.user_name},</h3>
                <p>Welcome to the club.</p>
            </html>
        `;
    }
}
