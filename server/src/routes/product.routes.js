const Router = require("express");
const router = new Router();
const productControllers = require("../controllers/product.controllers");

router.get("/products", productControllers.getProduct);

module.exports = router;
