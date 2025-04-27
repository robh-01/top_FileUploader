import { Router } from "express";
import * as indexController from "../controllers/indexController.js";

const indexRouter = Router();

indexRouter.get("/sign-in", indexController.signinGet);
indexRouter.post("/sign-in", indexController.signinPost)
indexRouter.get("", indexController.indexPageGet);

export default indexRouter;
