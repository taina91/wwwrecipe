const db = require("../config/db");

class ProductControllers {
  async getProduct(req, res) {
    const products = await db.query("SELECT * FROM products ORDER BY title;");
    res.json(products.rows);
  }
}

module.exports = new ProductControllers();
