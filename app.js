import express from "express";
const app = express();

//import configs
import configEjs from "./configs/ejs.config.js";
import configSession from "./configs/session.config.js";
import { configPassport } from "./configs/passport.config.js";

//import routers
import indexRouter from "./routes/indexRouter.js";

//essentials
app.use(express.urlencoded({ extended: true }));

//configs
configEjs(app);
configSession(app);
configPassport(app);

//routing
app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
