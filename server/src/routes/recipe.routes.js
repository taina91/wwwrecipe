const Router = require("express");
const router = new Router();
const recipeControllers = require("../controllers/recipe.controllers");

router.get("/recipe", recipeControllers.getRecipes);

module.exports = router;
