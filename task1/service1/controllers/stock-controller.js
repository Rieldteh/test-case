const stockService = require("../services/stock-service");
class StockController {
    async createStorage(req, res, next) {
        try {
            const { product_id, shop_id, amount } = req.body;
            const storage = await stockService.createStorage(product_id, shop_id, amount);
            res.status(200).json({ storage });
        } catch(error) {
            res.status(error.statusCode ? error.statusCode : 500).json({ message: error.message });
        }
    }

    async getStorages(req, res, next) {
        try {
            const data = req.body;
            const storages = await stockService.getStorages(data);
            res.status(200).json({ storages });
        } catch(error) {
            res.status(error.statusCode ? error.statusCode : 500).json({ message: error.message });
        }
    }

    async deleteStorage(req, res, next) {
        try {
            const { product_id, shop_id } = req.body;
            await stockService.deleteStorage(product_id, shop_id);
            res.status(200).json({ message: "Storage has been successfully deleted" });
        } catch(error) {
            res.status(error.statusCode ? error.statusCode : 500).json({ message: error.message });
        }
    }

    async changeStorage(req, res, next) {
        try {
            const { product_id, shop_id, amount } = req.body;
            const shell = await stockService.changeStorage(product_id, shop_id, amount);
            res.status(200).json({ shell });
        } catch(error) {
            res.status(error.statusCode ? error.statusCode : 500).json({ message: error.message });
        }
    }

    async createOrder(req, res, next) {
        try {
            const { product_id, shop_id, amount } = req.body;
            const order = await stockService.createOrder(product_id, shop_id, amount);
            res.status(200).json({ order });
        } catch(error) {
            res.status(error.statusCode ? error.statusCode : 500).json({ message: error.message });
        }
    }

    async getOrders(req, res, next) {
        try {
            const data = req.body;
            const orders = await stockService.getOrders(data);
            res.status(200).json({ orders });
        } catch(error) {
            res.status(error.statusCode ? error.statusCode : 500).json({ message: error.message });
        }
    }

    async deleteOrder(req, res, next) {
        try {
            const id = Number(req.params.id);
            await stockService.deleteOrder(id);
            res.status(200).json({ message: "Order has been successfelly deleted" });
        } catch(error) {
            res.status(error.statusCode ? error.statusCode : 500).json({ message: error.message });
        }
    }
}

module.exports = new StockController();