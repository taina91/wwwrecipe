const db = require("../config/db");
const Joi = require("joi");
class AuthControllers {
  async register(req, res) {
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
      res.send({
        user: newUser.rows[0],
      });
    } else {
      res.status(400).send({
        error: "Этот адрес электронной почты уже используется",
      });
    }
  }
  registerPolicy(req, res, next) {
    const schema = Joi.object({
      email: Joi.string().email(),
      password: Joi.string().regex(new RegExp("^[a-zA-Z0-9]{8,32}$")),
      first_name: Joi.string().min(3),
      last_name: Joi.string().min(1),
    });
    const { error, value } = schema.validate(req.body);
    if (error) {
      switch (error.details[0].context.key) {
        case "email":
          res.status(400).send({
            error: "Электронная почта не корректна",
          });
        case "password":
          res.status(400).send({
            error: `<ul style="text-align: start;">
										<li>Пароль может содержать только буквы латинского алфавита и цифры</li>
										<li>Пароль должен содержать буквы в верхнем и нижнем регистрах и цифры</li>
										<li>Минимальная длина пароля 8 симаолов</li>
										</ul> `,
          });
        default:
          res.status(400).send({
            error: "Ошибка ввода данных",
          });
      }
    } else {
      next();
    }
  }
  async login(req, res) {
    const { email, password } = req.body;
    const user = await db.query("SELECT * FROM users WHERE email = $1;", [
      email,
    ]);
    if (user.rows.length == 1) {
      if (user.rows[0].password == password) {
        res.send({
          user: user.rows[0],
        });
      } else {
        res.status(403).send({
          error: "Неверно введен пароль",
        });
      }
    } else {
      res.status(403).send({
        error: "Пользователя с таким email не существует",
      });
    }
  }
}

module.exports = new AuthControllers();
