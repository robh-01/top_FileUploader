import express from "express";
const app = express();

//import configs
import configEjs from "./configs/config.ejs.js";

//import routers
import indexRouter from "./routes/indexRouter.js";

configEjs(app);
app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
