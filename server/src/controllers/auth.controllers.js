const db = require("../config/db");
const Joi = require("joi");
class AuthControllers {
  async register(req, res) {
    // console.log("ok");
    const email = req.body.email;
    const user = await db.query("SELECT * FROM users WHERE email = $1;", [
      email,
    ]);
    if (user.rows.length == 0) {
      const { first_name, last_name, email, password } = req.body;
      const newUser = await db.query(
        "INSERT INTO users (first_name, last_name, email, password) values ($1, $2, $3, $4) RETURNING *",
        [first_name, last_name, email, password]
      );
      res.json(newUser.rows[0]);
    } else {
      res.status(400).send({
        error: "This email is used",
      });
    }
  }
  registerPolicy(req, res, next) {
    const schema = Joi.object({
      email: Joi.string().email(),
      // email: Joi.string(),
      password: Joi.string().regex(new RegExp("^[a-zA-Z0-9]{8,32}$")),
      first_name: Joi.string(),
      last_name: Joi.string(),
    });
    const { error, value } = schema.validate(req.body);
    if (error) {
      switch (error.details[0].context.key) {
        case "email":
          res.status(400).send({
            error: "Invalid email",
          });
        case "password":
          res.status(400).send({
            error: "Invalid password",
          });
        default:
          res.status(400).send({
            error: "Invalid data",
          });
      }
    } else {
      next();
    }
  }
}

module.exports = new AuthControllers();
