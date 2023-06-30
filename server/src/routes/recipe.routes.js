const Router = require("express");
const router = new Router();
const recipeControllers = require("../controllers/recipe.controllers");

router.get("/recipe", recipeControllers.getRecipes);
router.get("/recipe/:id", recipeControllers.getOneRecipe);
router.get("/recipeoptions", recipeControllers.getRecipesWithOptions);

module.exports = router;
