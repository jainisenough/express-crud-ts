import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import filmController from "../../controller/film";
import { Routes } from "..";

const route: Routes[] = [
  {
    method: "get",
    path: "/",
    handler: async (_req: Request, res: Response, _next: NextFunction) => {
      const resp = await filmController.get();
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
        title: Joi.string().required(),
        description: Joi.string(),
        releaseYear: Joi.number().required(),
        rentalDuration: Joi.number().required(),
        length: Joi.number().required(),
        replacementCost: Joi.number().required(),
        rating: Joi.string().required(),
        specialFeatures: Joi.string(),
      },
    },
    handler: async (req: Request, res: Response) => {
      const resp = await filmController.create(req.body);
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
        title: Joi.string(),
        description: Joi.string(),
        releaseYear: Joi.number(),
        rentalDuration: Joi.number(),
        length: Joi.number(),
        replacementCost: Joi.number(),
        rating: Joi.string(),
        specialFeatures: Joi.string(),
      },
    },
    handler: async (req: Request, res: Response) => {
      const resp = await filmController.updateById(req.params.id, req.body);
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
      const resp = await filmController.deleteById(req.params.id);
      res.json({
        message: "OK",
        statusCode: 200,
        data: resp,
      });
    },
  },
];

export default route;
