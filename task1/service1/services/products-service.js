const { PrismaClient } = require('@prisma/client');
const createError = require("./error-service");
const prisma = new PrismaClient();

class ProductsService {
    async create(plu, name) {
        const dbproduct = await prisma.product.findUnique({ where: { plu } });
        
        if (dbproduct) {
            throw createError("Product is already created", 409);
        }

        const product = await prisma.product.create({
            data: {
                plu,
                name
            }
        });

        return product;
    }

    async get(plu, name) {
        const products = await prisma.product.findMany({
            where: {
                plu: plu || undefined,
                name: name || undefined
            }
        });

        if (products.length === 0) {
            throw createError("No products found", 404);
        }

        return products;
    }

    async delete(plu) {
        const product = await prisma.product.findUnique({ where: { plu } });
        
        if (!product) {
            throw createError("Product is not found", 404);
        }

        await prisma.product.delete({ where: { id: product.id } });
    }
}

module.exports = new ProductsService();