
module.exports = class UserService {
    constructor(app) {
        this.app = app;
    }

    async createUser({
        first_name,
        last_name,
        email,
        password,
        role = 'REGULAR',
        preferredWorkingHours = 8
    }) {
        const userExists = await this.app.models.User.count({
            where: {
                email
            }
        });

        if (userExists) {
            throw new this.app.errors.BadRequestError('Email already taken.');
        }

        return this.app.models.User.create({
            first_name,
            last_name,
            email,
            role,
            password: await this.app.helpers.makeHash(password),
            preferences: {
                preferredWorkingHours
            }
        });
    }
}


