import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import customerController from "../../controller/customer";
import { Routes } from "..";

const route: Routes[] = [
  {
    method: "get",
    path: "/",
    handler: async (_req: Request, res: Response, _next: NextFunction) => {
      const resp = await customerController.get();
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
        email: Joi.string().required(),
        active: Joi.number().required(),
      },
    },
    handler: async (req: Request, res: Response) => {
      const resp = await customerController.create(req.body);
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
        email: Joi.string(),
        active: Joi.number(),
      },
    },
    handler: async (req: Request, res: Response) => {
      const resp = await customerController.updateById(req.params.id, req.body);
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
      const resp = await customerController.deleteById(req.params.id);
      res.json({
        message: "OK",
        statusCode: 200,
        data: resp,
      });
    },
  },
];

export default route;
