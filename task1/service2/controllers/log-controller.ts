import { Request, Response } from "express";
import logService from "../services/log-service";

class LogController {
  async create(req: Request, res: Response) {
    try {
      const { shop_id, plu, action, description } = req.body;
      const log = await logService.create(shop_id, plu, action, description);
      res.json({ log });
    } catch (error) {
      const statusCode = (error as { statusCode?: number }).statusCode || 500;
      res.status(statusCode).json({ message: (error as Error).message });
    }
  }

  async get(req: Request, res: Response) {
    try {
      const { page } = req.query;
      const pageNum = typeof page === "string" ? parseInt(page, 10) : NaN;
      const data = req.body;
      const logs = await logService.get(pageNum || 1, data);
      res.json({ logs });
    } catch (error) {
      const statusCode = (error as { statusCode?: number }).statusCode || 500;
      res.status(statusCode).json({ message: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await logService.delete(id);
      res.json({ message: "Log has been successfully deleted" });
    } catch (error) {
      const statusCode = (error as { statusCode?: number }).statusCode || 500;
      res.status(statusCode).json({ message: (error as Error).message });
    }
  }
}

export default new LogController();
