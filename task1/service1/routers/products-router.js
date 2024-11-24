const productController = require("../controllers/products-controller");

const productRouter = require("express").Router();

productRouter.post("/", productController.create);
productRouter.get("/", productController.get);
productRouter.delete("/", productController.delete);

module.exports = productRouter;
