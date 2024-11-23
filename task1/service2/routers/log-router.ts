import express from "express";
import logController from "../controllers/log-controller";

const logRouter = express.Router();

logRouter.post("/", logController.create);
logRouter.post("/:pageNum", logController.get);
logRouter.delete("/:id", logController.delete);

export default logRouter;
