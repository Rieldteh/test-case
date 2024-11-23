const shopService = require("../services/shop-service");

class ShopController {
    async create(req, res, next) {
        try {
            const { title, address } = req.body;
            const shop = await shopService.create(title, address);
            res.status(200).json({ shop });
        } catch (error) {
            res.status(error.statusCode ? error.statusCode : 500).json({ message: error.message });
        }
    }

    async get(req, res, next) {
        try {
            const { title, address } = req.body;
            const shop = await shopService.get(title, address);
            res.status(200).json({ shop });
        } catch (error) {
            res.status(error.statusCode ? error.statusCode : 500).json({ message: error.message });
        }
    }

    async delete(req, res, next) {
        try {
            const { title, address } = req.body;
            await shopService.delete(title, address);
            res.status(200).json({ message: "Shop has been successfully deleted" });
        } catch (error) {
            res.status(error.statusCode ? error.statusCode : 500).json({ message: error.message });
        }
    }
}

module.exports = new ShopController();