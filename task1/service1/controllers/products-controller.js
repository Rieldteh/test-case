const productsService = require("../services/products-service");

class ProductsController {
  async create(req, res, next) {
    try {
      const { plu, name } = req.body;
      const product = await productsService.create(plu, name);
      res.status(200).json({ product });
    } catch (error) {
      res
        .status(error.statusCode ? error.statusCode : 500)
        .json({ message: error.message });
    }
  }

  async get(req, res, next) {
    try {
      const { plu, name } = req.query;
      const product = await productsService.get(plu, name);
      res.status(200).json({ product });
    } catch (error) {
      res
        .status(error.statusCode ? error.statusCode : 500)
        .json({ message: error.message });
    }
  }

  async delete(req, res, next) {
    try {
      const { plu } = req.body;
      await productsService.delete(plu);
      res
        .status(200)
        .json({ message: "Product has been successfully deleted" });
    } catch (error) {
      res
        .status(error.statusCode ? error.statusCode : 500)
        .json({ message: error.message });
    }
  }
}

module.exports = new ProductsController();
