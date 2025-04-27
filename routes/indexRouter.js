import { Router } from "express";
import * as indexController from "../controllers/indexController.js";

const indexRouter = Router();

indexRouter.use("/sign-in", indexController.signinPageGet);
indexRouter.use("", indexController.indexPageGet);

export default indexRouter;
