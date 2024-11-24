const stockService = require("../services/stock-service");
class StockController {
  async createStorage(req, res, next) {
    try {
      const { product_id, shop_id, amount } = req.body;
      const storage = await stockService.createStorage(
        product_id,
        shop_id,
        amount
      );
      res.status(200).json({ storage });
    } catch (error) {
      res
        .status(error.statusCode ? error.statusCode : 500)
        .json({ message: error.message });
    }
  }

  async getStorages(req, res, next) {
    try {
      const { product_id, shop_id, amount_from, amount_to } = req.query;
      const storages = await stockService.getStorages(
        product_id,
        shop_id,
        amount_from,
        amount_to
      );
      res.status(200).json({ storages });
    } catch (error) {
      res
        .status(error.statusCode ? error.statusCode : 500)
        .json({ message: error.message });
    }
  }

  async deleteStorage(req, res, next) {
    try {
      const { product_id, shop_id } = req.body;
      await stockService.deleteStorage(product_id, shop_id);
      res
        .status(200)
        .json({ message: "Storage has been successfully deleted" });
    } catch (error) {
      res
        .status(error.statusCode ? error.statusCode : 500)
        .json({ message: error.message });
    }
  }

  async incStorage(req, res, next) {
    try {
      const { product_id, shop_id, amount } = req.body;
      const storage = await stockService.incStorage(
        product_id,
        shop_id,
        amount
      );
      res.status(200).json({ storage });
    } catch (error) {
      res
        .status(error.statusCode ? error.statusCode : 500)
        .json({ message: error.message });
    }
  }

  async decStorage(req, res, next) {
    try {
      const { product_id, shop_id, amount } = req.body;
      const storage = await stockService.decStorage(
        product_id,
        shop_id,
        amount
      );
      res.status(200).json({ storage });
    } catch (error) {
      res
        .status(error.statusCode ? error.statusCode : 500)
        .json({ message: error.message });
    }
  }

  async createOrder(req, res, next) {
    try {
      const { product_id, shop_id, amount } = req.body;
      const order = await stockService.createOrder(product_id, shop_id, amount);
      res.status(200).json({ order });
    } catch (error) {
      res
        .status(error.statusCode ? error.statusCode : 500)
        .json({ message: error.message });
    }
  }

  async getOrders(req, res, next) {
    try {
      const { product_id, shop_id, amount_from, amount_to } = req.query;
      const productId = parseInt(product_id, 10);
      const shopId = parseInt(shop_id, 10);
      const amountFrom = parseInt(amount_from, 10);
      const amountTo = parseInt(amount_to, 10);
      const orders = await stockService.getOrders(
        productId,
        shopId,
        amountFrom,
        amountTo
      );
      res.status(200).json({ orders });
    } catch (error) {
      res
        .status(error.statusCode ? error.statusCode : 500)
        .json({ message: error.message });
    }
  }

  async deleteOrder(req, res, next) {
    try {
      const id = Number(req.params.id);
      await stockService.deleteOrder(id);
      res.status(200).json({ message: "Order has been successfelly deleted" });
    } catch (error) {
      res
        .status(error.statusCode ? error.statusCode : 500)
        .json({ message: error.message });
    }
  }
}

module.exports = new StockController();
