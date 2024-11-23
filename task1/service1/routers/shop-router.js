const shopController = require('../controllers/shop-controller');

const shopRouter = require('express').Router();

shopRouter.post('/create', shopController.create);
shopRouter.post('/', shopController.get);
shopRouter.delete('/', shopController.delete);

module.exports = shopRouter;