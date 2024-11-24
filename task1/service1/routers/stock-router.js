const stockController = require("../controllers/stock-controller");

const stockRouter = require("express").Router();

stockRouter.post("/storages", stockController.createStorage);
stockRouter.get("/storages", stockController.getStorages);
stockRouter.delete("/storages", stockController.deleteStorage);
stockRouter.post("/storages/inc", stockController.incStorage);
stockRouter.post("/storages/dec", stockController.decStorage);

stockRouter.post("/orders", stockController.createOrder);
stockRouter.get("/orders", stockController.getOrders);
stockRouter.delete("/orders/:id", stockController.deleteOrder);

module.exports = stockRouter;
