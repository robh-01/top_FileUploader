import { Router } from "express";
import * as indexController from "../controllers/indexController.js";

const indexRouter = Router();

indexRouter.use("", indexController.indexPageGet);

export default indexRouter;
