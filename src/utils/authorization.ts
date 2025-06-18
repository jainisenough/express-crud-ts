import { NextFunction, Request, Response } from "express";
import Boom from "@hapi/boom";

const authorize = (
  req: Request,
  res: Response,
  next: NextFunction,
  role: string
) => {
  const token = req.headers.authorization || req.query.token;
  // TODO: decode token, validate & authorize, currently static here
  if (token && token === role) {
    next();
  } else {
    throw Boom.unauthorized("Unauthorized: No authentication token provided.");
  }
};
export default authorize;
