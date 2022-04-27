const dotenv = require('dotenv');
const Sequelize = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');
const path = require('path');

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_SELECTED,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        dialect: "postgres",
        logging: false
    }
);

const umzug = new Umzug({
    migrations: {
		glob: path.resolve(__dirname, '..', '..', 'database', 'migrations/*.js'),
		pattern: /\.js$/
	},
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
});

(async () => {
    await umzug.down();

    sequelize.close();
})();
