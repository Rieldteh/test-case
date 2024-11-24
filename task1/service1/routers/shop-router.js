const shopController = require("../controllers/shop-controller");

const shopRouter = require("express").Router();

shopRouter.post("/", shopController.create);
shopRouter.get("/", shopController.get);
shopRouter.delete("/", shopController.delete);

module.exports = shopRouter;
