import { Request, RequestHandler, Response, Router, NextFunction } from "express";
import Joi, { ObjectSchema } from "joi";
import { Stats } from "node:fs";
import { readdir as fsReaddir, stat as fsStat } from "node:fs/promises";
import { join as pathJoin } from "node:path";
import { createValidator, ExpressJoiInstance } from "express-joi-validation";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import logger from "../utils/logger";
import authorize from "../utils/authorization";

type ValidatorObject = {
  [key in keyof ExpressJoiInstance]?: any;
};

export type Routes = {
  path: string;
  method: "get" | "post" | "delete" | "put" | "patch";
  validators?: ValidatorObject;
  role?: 'admin' | 'user';
  handler: (req: Request, res: Response, next: NextFunction) => Promise<void> | void;
};

const router = async () => {
  const expressRouter = Router();
  const dirData = await fsReaddir(__dirname);
  const dirStats = await Promise.all(
    dirData.map((dirName) => fsStat(pathJoin(__dirname, dirName)))
  );
  const baseDirs = dirStats.reduce(
    (acc: string[], stat: Stats, idx: number) =>
      stat.isDirectory() ? [...acc, dirData[idx]] : acc,
    []
  );

  logger.debug(baseDirs);

  const routerData = await Promise.all(
    baseDirs.map(async (baseDir) => {
      const route = await import(`./${baseDir}`);
      return route.default.map((r: Routes) => ({
        ...r,
        path: `/${baseDir}${r.path}`,
        method: r.method.toLowerCase(),
      }));
    })
  );

  routerData.flat().forEach(({ method, path, handler, validators, role }: Routes) => {
    let middlewareArgs: RequestHandler<
      ParamsDictionary,
      any,
      any,
      ParsedQs,
      Record<string, any>
    >[] = [];
    if (validators) {
      const validator = createValidator();
      const validations = Object.entries(validators) as [
        keyof ExpressJoiInstance,
        ObjectSchema<any>
      ][];
      middlewareArgs = validations.map(([validate, validationSchema]) =>
        validator[validate](Joi.object(validationSchema))
      );
    }
    
    if(role) {
      middlewareArgs.push((...args) => authorize(...args, role));
    }
    expressRouter[method](path, ...middlewareArgs, handler);
  });

  return expressRouter;
};

export default router;
