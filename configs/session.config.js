import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { prisma } from "../db/prismaClient.js";

import dotenv from "dotenv";
dotenv.config();

function configSession(app) {
  app.use(
    session({
      store: new PrismaSessionStore(prisma, {
        checkPeriod: 2 * 60 * 1000, //in ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 24 * 60 * 60 * 1000 }, //1day = 24(hrs) * 60(minutes) * 60(seconds) * 1000 (milliseconds)
    })
  );
}

export default configSession;
