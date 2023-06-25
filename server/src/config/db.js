const config = require("./config");
const Pool = require("pg").Pool;
const pool = new Pool({
  user: config.db.user,
  password: config.db.password,
  host: config.db.host,
  port: config.db.port,
  database: config.db.database,
});
// const pool = new Pool({
//   database: "wwwrecipe",
//   user: "postgres",
//   password: "1111",
//   host: "localhost",
//   port: 5432,
// });

module.exports = pool;
