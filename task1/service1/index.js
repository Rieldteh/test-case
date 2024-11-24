const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const productRouter = require("./routers/products-router");
const shopRouter = require("./routers/shop-router");
const stockRouter = require("./routers/stock-router");

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/products", productRouter);
app.use("/shops", shopRouter);
app.use("/stocks", stockRouter);

app.listen(PORT, () => {
  console.log(`Listen to ${PORT}`);
});
