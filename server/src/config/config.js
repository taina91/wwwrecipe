module.exports = {
  port: 8081,
  db: {
    database: process.env.DB_NAME || "wwwrecipe",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "1111",
    host: process.env.HOST || "localhost",
    port: 5432,
  },
};
