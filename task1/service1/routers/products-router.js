const productController = require('../controllers/products-controller');

const productRouter = require('express').Router();

productRouter.post('/create', productController.create);
productRouter.post('/', productController.get);
productRouter.delete('/', productController.delete);

module.exports = productRouter;