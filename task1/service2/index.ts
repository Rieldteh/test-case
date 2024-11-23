import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import logRouter from './routers/log-router'

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/logs", logRouter);

app.listen(PORT, () => {
    console.log(`Listen to ${PORT}`);
});
