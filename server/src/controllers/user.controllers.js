const db = require("../db");
class UserControllers {
  async createUser(req, res) {
    const { first_name, last_name, email, password } = req.body;
    const newUser = await db.query(
      "INSERT INTO users (first_name, last_name, email, password) values ($1, $2, $3, $4) RETURNING *",
      [first_name, last_name, email, password]
    );
    res.json(newUser.rows[0]);
  }
  async getUsers(req, res) {
    const users = await db.query("SELECT * FROM users;");
    res.json(users.rows);
  }
  async getOneUser(req, res) {
    const id = req.params.id;
    const user = await db.query("SELECT * FROM users WHERE id = $1;", [id]);
    res.json(user.rows[0]);
  }
  async updateUser(req, res) {
    const { id, first_name, last_name, email, password } = req.body;
    const user = await db.query(
      "UPDATE users set first_name = $1, last_name = $2, email = $3, password = $4 WHERE id = $5 RETURNING *",
      [first_name, last_name, email, password, id]
    );
    res.json(user.rows[0]);
  }
  async deleteUser(req, res) {
    const id = req.params.id;
    const user = await db.query("DELETE FROM users WHERE id = $1;", [id]);
    res.json(user.rows[0]);
  }
}

module.exports = new UserControllers();
