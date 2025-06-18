import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import categoryController from "../../controller/category";
import { Routes } from "..";

const route: Routes[] = [
  {
    method: "get",
    path: "/",
    handler: async (_req: Request, res: Response, _next: NextFunction) => {
      const resp = await categoryController.get();
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
        name: Joi.string().required(),
      },
    },
    handler: async (req: Request, res: Response) => {
      const resp = await categoryController.create(req.body);
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
      },
    },
    handler: async (req: Request, res: Response) => {
      const resp = await categoryController.updateById(req.params.id, req.body);
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
      const resp = await categoryController.deleteById(req.params.id);
      res.json({
        message: "OK",
        statusCode: 200,
        data: resp,
      });
    },
  },
];

export default route;
