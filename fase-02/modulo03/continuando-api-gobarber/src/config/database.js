module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'docker',
    database: 'gobarber_continuando',
    define: {
        timestamp: true,
        underscored: true,
        underscoredAll: true,
    },
};
