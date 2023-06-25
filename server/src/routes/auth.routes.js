const Router = require("express");
const router = new Router();
const authControllers = require("../controllers/auth.controllers");

// router.post("/login", authControllers.login);
router.post(
  "/register",
  authControllers.registerPolicy,
  authControllers.register
);

module.exports = router;
