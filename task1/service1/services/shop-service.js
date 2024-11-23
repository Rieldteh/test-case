const { PrismaClient } = require('@prisma/client');
const createError = require("./error-service");
const prisma = new PrismaClient();

class ShopService {
    async create(title, address) {
        const dbshop = await prisma.shop.findFirst({
            where: {
                title,
                address
            }
        });

        if (dbshop) {
            throw createError("Shop is already created on this address", 409);
        }

        const shop = await prisma.shop.create({
            data: {
                title,
                address
            }
        });

        return shop;
    }

    async get(title, address) {
        const shops = await prisma.shop.findMany({
            where: {
                title: title || undefined,
                address: address || undefined
            }
        });

        if (shops.count === 0) {
            throw createError("No shops found", 404);
        }

        return shops;
    }

    async delete(title, address) {
        const shop = await prisma.shop.findFirst({
            where: {
                title,
                address
            }
        });

        if (!shop) {
            throw createError("Shop is not found", 404);
        }

        await prisma.shop.delete({ where: { id: shop.id } });
    }
}

module.exports = new ShopService();