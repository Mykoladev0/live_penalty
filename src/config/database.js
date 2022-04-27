module.exports = (env) => {
    return {
        username: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_SELECTED,
        options: {
            host: env.DB_HOST,
            port: env.DB_PORT,
            dialect: "postgres",
            logging: false
        }
    };
}
