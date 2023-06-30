const { query } = require("express");
const db = require("../config/db");
const fs = require("fs");
const path = require("path");

class RecipeControllers {
  async getRecipes(req, res) {
    const page = req.query.page;
    const limit = req.query.limit;
    const offset = (page - 1) * limit;
    let recipes = [];
    if (req.query.str) {
      const str = req.query.str;
      recipes = await db.query(
        `SELECT * FROM recipes WHERE title LIKE '%${str}%' ORDER BY id LIMIT $1 OFFSET $2;`,
        [limit, offset]
      );
    } else {
      recipes = await db.query(
        "SELECT * FROM recipes ORDER BY id LIMIT $1 OFFSET $2;",
        [limit, offset]
      );
    }
    const result = [];
    for (var i = 0; i < recipes.rows.length; i++) {
      const products = await db.query(
        "SELECT title, count, unit FROM recipe_product join products on products.id = recipe_product.id_product WHERE id_recipe = $1",
        [recipes.rows[i].id]
      );
      let jsonFile = null;
      if (recipes.rows[i].url_recipe_text !== null) {
        const tempPath = path.join(
          path.resolve(__dirname, "..", ".."),
          recipes.rows[i].url_recipe_text
        );
        jsonFile = JSON.parse(fs.readFileSync(tempPath, "utf8"));
      }
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
  async getRecipesWithOptions(req, res) {
    let recipeId = [];
    if (req.query.withProduct) {
      let tmpStr = "";
      let tmpCnt = req.query.withProduct.length;
      req.query.withProduct.forEach((a) => {
        tmpStr += a + ",";
      });
      tmpStr = tmpStr.slice(0, -1);
      let queryStr =
        "select id_recipe from" +
        " ( select id_recipe from recipe_product rp where id_product in (" +
        tmpStr +
        ")) as pr group by pr.id_recipe having count(pr.id_recipe) =" +
        tmpCnt +
        ";";
      console.log(queryStr);
      const recipes = await db.query(queryStr);
      recipes.rows.forEach((element) => {
        recipeId.push(element.id_recipe);
      });
    }
    if (req.query.withoutProduct) {
      let tmpStr = "";
      req.query.withoutProduct.forEach((a) => {
        tmpStr += a + ",";
      });
      tmpStr = tmpStr.slice(0, -1);
      let queryStr =
        "select distinct id_recipe from recipe_product where not id_product in (" +
        tmpStr +
        ") EXCEPT select distinct id_recipe from recipe_product where id_product in (" +
        tmpStr +
        ");";
      const recipes = await db.query(queryStr);
      let tmp = [];
      recipes.rows.forEach((element) => {
        tmp.push(element.id_recipe);
      });
      if (recipeId.length > 0)
        recipeId = recipeId.filter((x) => tmp.includes(x));
      else recipeId = tmp;
    }
    if (req.query.tags) {
    }
    const result = [];
    if (recipeId.length > 0) {
      let tmpStr = "";
      recipeId.forEach((a) => {
        tmpStr += a + ",";
      });
      tmpStr = tmpStr.slice(0, -1);
      const queryStr =
        "SELECT * FROM recipes WHERE id in (" + tmpStr + ") ORDER BY id;";
      const recipesRes = await db.query(queryStr);
      for (var i = 0; i < recipesRes.rows.length; i++) {
        const products = await db.query(
          "SELECT title, count, unit FROM recipe_product join products on products.id = recipe_product.id_product WHERE id_recipe = $1",
          [recipesRes.rows[i].id]
        );
        let jsonFile = null;
        if (recipesRes.rows[i].url_recipe_text !== null) {
          const tempPath = path.join(
            path.resolve(__dirname, "..", ".."),
            recipesRes.rows[i].url_recipe_text
          );
          jsonFile = JSON.parse(fs.readFileSync(tempPath, "utf8"));
        }
        result[i] = {
          id: recipesRes.rows[i].id,
          title: recipesRes.rows[i].title,
          author: recipesRes.rows[i].author,
          time_cooking: recipesRes.rows[i].time_cooking,
          difficult: recipesRes.rows[i].difficult,
          portions: recipesRes.rows[i].portions,
          recipe_text: jsonFile,
          url_main_img: recipesRes.rows[i].url_main_img,
          products: products.rows,
        };
      }
    }
    res.json(result);
    // res.send(recipeId);
  }
}

// рецепты без
// select distinct id_recipe from recipe_product where not id_product in (1, 3, 4)
// EXCEPT
// select distinct id_recipe from recipe_product where id_product in (1, 3, 4);                                                EXCEPT                                                                                                                                     select distinct id_recipe from recipe_product where id_product in (1, 3, 4);

module.exports = new RecipeControllers();
