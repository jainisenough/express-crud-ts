import {
  CreateOptions,
  DestroyOptions,
  FindOptions,
  Identifier,
  Model,
  ModelStatic,
  Optional,
  SaveOptions,
  UpdateOptions,
  WhereOptions,
} from "sequelize";
import asyncWrapper from "../utils/asyncWrapper";

class Controller {
  entityModel: ModelStatic<Model<any, any>>;
  constructor(entityModel: ModelStatic<Model<any, any>>) {
    this.entityModel = entityModel;
  }

  get(params: FindOptions<any> = {}) {
    return asyncWrapper<Model<any, any>[], FindOptions<any>>(
      this.entityModel.findAll.bind(this.entityModel)
    )(params);
  }

  getById(id: Identifier) {
    return asyncWrapper<
      Model<any, any> | null,
      Identifier | Omit<FindOptions<any>, "where"> | any
    >(this.entityModel.findByPk.bind(this.entityModel))(id);
  }

  create(payload: Optional<any, string>) {
    return asyncWrapper<Model<any, any>, Optional<any, string> | undefined>(
      this.entityModel.create.bind(this.entityModel)
    )(payload);
  }

  async updateById(id: Identifier, payload: Optional<any, string>) {
    const modelData = await this.getById(id);
    let updatedData = null;
    if (modelData) {
      Object.assign(modelData, payload);
      updatedData = await asyncWrapper<
        Model<any, any>,
        SaveOptions<any> | undefined
      >(modelData.save.bind(modelData))();
    }

    return updatedData;
  }

  update(where: WhereOptions<any>, payload: Optional<any, string>) {
    return asyncWrapper<
      [affectedCount: number],
      { [x: string]: any } | UpdateOptions<any> | any
    >(this.entityModel.update.bind(this.entityModel))(payload, { where });
  }

  async deleteById(id: Identifier) {
    const deleteCount = await asyncWrapper<
      number,
      DestroyOptions<any> | undefined
    >(this.entityModel.destroy.bind(this.entityModel))({
      where: { id },
    });

    return deleteCount > 0;
  }
}

export default Controller;
