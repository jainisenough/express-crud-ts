import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import { Boom, boomify, isBoom } from "@hapi/boom";
import sqlite from "./utils/sqlite";
import DB from "./utils/db";
import logger from "./utils/logger";
import router from "./router";

(async () => {
  const app = express();
  const dbIns = new DB({ dbIns: sqlite });
  await dbIns.authenticate();

  app.use(
    cors({
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );
  app.use(helmet());
  app.use(bodyParser.json());

  const expressRouter = await router();
  app.use("/", expressRouter);
  app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
  });

  app.listen(process.env.PORT, () => {
    logger.info(`App listening on port ${process.env.PORT}`);
  });

  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    let errInfo = err as Boom;
    if (!isBoom(err)) {
      errInfo = boomify(err, { statusCode: 500 });
    }

    const {
      output: { statusCode = 500, payload = {} },
    } = errInfo;
    res.status(statusCode).json(payload);
  });

  process.on("unhandledRejection", (err) => {
    logger.info(err);
    process.exit(1);
  });
})();
