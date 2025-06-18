import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import actorController from "../../controller/actors";
import createRouter, { Routes } from "../../utils/createRouter";

const route: Routes[] = [
  {
    method: "get",
    path: "/",
    role: "admin",
    handler: async (_req: Request, res: Response, _next: NextFunction) => {
      const resp = await actorController.get();
      res.json({
        message: "OK",
        statusCode: 200,
        data: resp,
      });
    },
  },
  {
    method: "post",
    path: "/",
    validators: {
      body: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
      },
    },
    handler: async (req: Request, res: Response) => {
      const resp = await actorController.create(req.body);
      res.json({
        message: "OK",
        statusCode: 200,
        data: resp,
      });
    },
  },
  {
    method: "put",
    path: "/:id",
    validators: {
      params: {
        id: Joi.number().integer().required(),
      },
      body: {
        firstName: Joi.string(),
        lastName: Joi.string(),
      },
    },
    handler: async (req: Request, res: Response) => {
      const resp = await actorController.updateById(
        parseInt(req.params.id),
        req.body
      );
      res.json({
        message: "OK",
        statusCode: 200,
        data: resp,
      });
    },
  },
  {
    method: "delete",
    path: "/:id",
    validators: {
      params: {
        id: Joi.number().integer().required(),
      },
    },
    handler: async (req: Request, res: Response) => {
      const resp = await actorController.deleteById(req.params.id);
      res.json({
        message: "OK",
        statusCode: 200,
        data: resp,
      });
    },
  },
];

export default {
  path: 'actors',
  routes: createRouter(route)
};
