import {
  Response,
  NextFunction,
  Request,
  Router,
  RequestHandler,
} from "express";
import Joi, { ObjectSchema } from "joi";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { createValidator, ExpressJoiInstance } from "express-joi-validation";
import authorize from "./authorization";

type ValidatorObject = {
  [key in keyof ExpressJoiInstance]?: any;
};

type Method = "get" | "post" | "delete" | "put";

export type Routes = {
  path: string;
  method: Method;
  validators?: ValidatorObject;
  role?: "admin" | "user";
  handler: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void> | void;
};

const createRouter = (route: Routes[]) => {
  const expressRouter = Router();
  route.forEach(({ method, path, handler, validators, role }: Routes) => {
    const routeMethod = method.toLowerCase() as Method;
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

    if (role) {
      middlewareArgs.push((...args) => authorize(...args, role));
    }
    expressRouter[routeMethod](path, ...middlewareArgs, handler);
  });
	return expressRouter;
};

export default createRouter;
