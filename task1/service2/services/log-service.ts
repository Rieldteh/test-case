import { PrismaClient, Actions } from "@prisma/client";
import { createError } from "./error-service";
const prisma = new PrismaClient();

class LogService {
  async create(shop_id: number, plu: string, action: Actions, description: string) {
    const log = await prisma.logs.create({
      data: {
        shop_id,
        plu,
        action,
        description
      }
    });

    return log;
  }

  async get(pageNum: number, data: any) {
    const pageSize = 10;

    if (pageNum < 1) {
      throw createError("Wrong page", 400);
    }

    const logs = await prisma.logs.findMany({
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
        where: {
            shop_id: data.shop_id || undefined,
            plu: data.plu || undefined,
            date: {
                gte: data.date_from || undefined,
                lte: data.date_to || undefined
            },
            action: data.action || undefined
        }
    });

    if (logs.length === 0) {
      throw createError("No logs found", 404);
    }

    return logs;
  }

  async delete(id: number) {
    const log = await prisma.logs.findFirst({ where: { id } });

    if (!log) {
      throw createError("Log is not found", 404);
    }

    await prisma.logs.delete({ where: { id } });
  }
}

export default new LogService();
