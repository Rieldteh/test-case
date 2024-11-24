const { PrismaClient } = require("@prisma/client");
const { logAction, Actions } = require("./log-service");
const createError = require("./error-service");
const prisma = new PrismaClient();

class StockService {
  async createStorage(productId, shopId, amount) {
    const dbstorage = await prisma.storage.findFirst({
      where: { product_id: productId, shop_id: shopId },
    });

    if (dbstorage) {
      throw createError("Storage is already exist", 409);
    }

    const dbproduct = await prisma.product.findFirst({
      where: { id: productId },
    });

    if (!dbproduct) {
      throw createError("Product is not found", 404);
    }

    const dbshop = await prisma.shop.findFirst({ where: { id: shopId } });

    if (!dbshop) {
      throw createError("Shop is not found", 404);
    }

    const storage = await prisma.storage.create({
      data: {
        product: {
          connect: { id: productId },
        },
        shop: {
          connect: { id: shopId },
        },
        amount,
      },
      include: {
        product: true,
      },
    });

    logAction(
      storage.shop_id,
      storage.product.plu,
      Actions.CREATE,
      `Storage ${storage.id} has been created`
    );

    return storage;
  }

  async getStorages(product_id, shop_id, amount_from, amount_to) {
    const storages = await prisma.storage.findMany({
      where: {
        product_id: product_id || undefined,
        shop_id: shop_id || undefined,

        amount: {
          gte: amount_from || undefined,
          lte: amount_to || undefined,
        },
      },
    });

    if (storages.length === 0) {
      throw createError("No storages found", 404);
    }

    return storages;
  }

  async deleteStorage(productId, shopId) {
    const storage = await prisma.storage.findFirst({
      where: { product_id: productId, shop_id: shopId },
      include: { product: true },
    });

    if (!storage) {
      throw createError("Storage is not found", 404);
    }

    const temp = {
      id: storage.id,
      shopId: shopId,
      plu: storage.product.plu,
    };

    await prisma.storage.delete({ where: { id: storage.id } });

    logAction(
      temp.shopId,
      temp.plu,
      Actions.DELETE,
      `Storage ${temp.id} has been deleted`
    );
  }

  async incStorage(productId, shopId, amount) {
    if (amount < 0) {
      throw createError("Amount error", 400);
    }

    const storage = await this.changeStorage(productId, shopId, amount);
    return storage;
  }

  async decStorage(productId, shopId, amount) {
    if (amount < 0) {
      throw createError("Amount error", 400);
    }

    const storage = await this.changeStorage(productId, shopId, -amount);
    return storage;
  }

  async createOrder(productId, shopId, amount) {
    const dbstorage = await prisma.storage.findFirst({
      where: { product_id: productId, shop_id: shopId },
    });

    if (!dbstorage) {
      throw createError("Storage is not found", 404);
    }

    if (amount < 0 || amount > dbstorage.amount) {
      throw createError("Amount Error", 400);
    }

    await prisma.storage.update({
      where: { id: dbstorage.id },
      data: {
        amount: dbstorage.amount - amount,
      },
    });

    const order = await prisma.order.create({
      data: {
        product: {
          connect: { id: productId },
        },
        shop: {
          connect: { id: shopId },
        },
        amount,
      },
      include: {
        product: true,
      },
    });

    logAction(
      order.shop_id,
      order.product.plu,
      Actions.CREATE,
      `Order ${order.id} has been created`
    );

    return order;
  }

  async getOrders(product_id, shop_id, amount_from, amount_to) {
    const orders = await prisma.order.findMany({
      where: {
        product_id: product_id || undefined,
        shop_id: shop_id || undefined,

        amount: {
          gte: amount_from || undefined,
          lte: amount_to || undefined,
        },
      },
    });

    if (orders.length === 0) {
      throw createError("No orders found", 404);
    }

    return orders;
  }

  async deleteOrder(id) {
    const order = await prisma.order.findFirst({
      where: { id },
      include: { product: true, shop: true },
    });

    if (!order) {
      throw createError("Order is not found", 404);
    }

    const dbstorage = await prisma.storage.findFirst({
      where: { product_id: order.product.id, shop_id: order.shop.id },
    });

    if (!dbstorage) {
      throw createError("Storage is not found", 404);
    }

    await prisma.storage.update({
      where: { id: dbstorage.id },
      data: {
        amount: dbstorage.amount + order.amount,
      },
    });

    const temp = {
      id: order.id,
      shopId: order.shop_id,
      plu: order.product.plu,
    };

    await prisma.order.delete({ where: { id } });

    logAction(
      temp.shopId,
      temp.plu,
      Actions.DELETE,
      `Order ${temp.id} has been deleted`
    );
  }

  async changeStorage(productId, shopId, amount) {
    const dbstorage = await prisma.storage.findFirst({
      where: { product_id: productId, shop_id: shopId },
    });

    if (!dbstorage) {
      throw createError("Storage is not found", 404);
    }

    const isInc = amount > 0 ? true : false;

    if (!isInc) {
      if (dbstorage.amount === 0) {
        throw createError("Storage is empty", 200);
      }

      if (Math.abs(amount) > dbstorage.amount) {
        throw createError("Amount error", 400);
      }
    }

    const storage = await prisma.storage.update({
      where: {
        id: dbstorage.id,
      },
      data: {
        amount: dbstorage.amount + amount,
      },
      include: {
        product: true,
      },
    });

    logAction(
      storage.shop_id,
      storage.product.plu,
      Actions.UPDATE,
      `Storage ${storage.id} has been ${
        isInc ? "increased" : "decreased"
      } on ${Math.abs(amount)}`
    );

    return storage;
  }
}

module.exports = new StockService();
