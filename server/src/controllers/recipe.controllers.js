const db = require("../config/db");
class RecipeControllers {
  async getRecipes(req, res) {
    const page = req.query.page;
    const limit = req.query.limit;
    const offset = (page - 1) * limit;
    const recipes = await db.query(
      "SELECT * FROM recipes LIMIT $1 OFFSET $2;",
      [limit, offset]
    );
    const result = [];
    for (var i = 0; i < recipes.rows.length; i++) {
      const products = await db.query(
        "SELECT title, count, unit FROM recipe_product join products on products.id = recipe_product.id_product WHERE id_recipe = $1",
        [recipes.rows[i].id]
      );
      result[i] = {
        id: recipes.rows[i].id,
        title: recipes.rows[i].title,
        author: recipes.rows[i].author,
        time_cooking: recipes.rows[i].time_cooking,
        difficult: recipes.rows[i].difficult,
        portions: recipes.rows[i].portions,
        url_recipe_text: recipes.rows[i].url_recipe_text,
        url_main_img: recipes.rows[i].url_main_img,
        products: products.rows,
      };
    }
    res.json(result);
  }
}

module.exports = new RecipeControllers();
