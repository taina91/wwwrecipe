const db = require("../config/db");
const fs = require("fs");
const path = require("path");

class RecipeControllers {
  async getRecipes(req, res) {
    const page = req.query.page;
    const limit = req.query.limit;
    const offset = (page - 1) * limit;
    const recipes = await db.query(
      "SELECT * FROM recipes ORDER BY id LIMIT $1 OFFSET $2;",
      [limit, offset]
    );
    const result = [];
    for (var i = 0; i < recipes.rows.length; i++) {
      const products = await db.query(
        "SELECT title, count, unit FROM recipe_product join products on products.id = recipe_product.id_product WHERE id_recipe = $1",
        [recipes.rows[i].id]
      );
      const tempPath = path.join(
        path.resolve(__dirname, "..", ".."),
        recipes.rows[i].url_recipe_text
      );
      const jsonFile = JSON.parse(fs.readFileSync(tempPath, "utf8"));
      result[i] = {
        id: recipes.rows[i].id,
        title: recipes.rows[i].title,
        author: recipes.rows[i].author,
        time_cooking: recipes.rows[i].time_cooking,
        difficult: recipes.rows[i].difficult,
        portions: recipes.rows[i].portions,
        recipe_text: jsonFile,
        url_main_img: recipes.rows[i].url_main_img,
        products: products.rows,
      };
    }
    res.json(result);
  }
  async getOneRecipe(req, res) {
    const id = req.params.id;
    const recipe = await db.query("SELECT * FROM recipes WHERE id = $1;", [id]);
    const products = await db.query(
      "SELECT title, count, unit FROM recipe_product join products on products.id = recipe_product.id_product WHERE id_recipe = $1",
      [id]
    );
    const tempPath = path.join(
      path.resolve(__dirname, "..", ".."),
      recipe.rows[0].url_recipe_text
    );
    const jsonFile = JSON.parse(fs.readFileSync(tempPath, "utf8"));
    const result = {
      id: recipe.rows[0].id,
      title: recipe.rows[0].title,
      author: recipe.rows[0].author,
      time_cooking: recipe.rows[0].time_cooking,
      difficult: recipe.rows[0].difficult,
      portions: recipe.rows[0].portions,
      recipe_text: jsonFile,
      url_main_img: recipe.rows[0].url_main_img,
      products: products.rows,
    };
    res.json(result);
  }
}

module.exports = new RecipeControllers();
