import { isBoom, boomify } from "@hapi/boom";
import { ValidationError, UniqueConstraintError } from "sequelize";

const asyncWrapper =
  <T, P>(fn: (...args: P[]) => Promise<T>) =>
  async (...args: P[]) => {
    try {
      return await fn(...args);
    } catch (err) {
      const boomOptions = { statusCode: 500 };

      if (isBoom(err)) {
        if (err instanceof ValidationError) {
          boomOptions.statusCode = 400;
        } else if (err instanceof UniqueConstraintError) {
          boomOptions.statusCode = 409;
        }
        throw boomify(err, boomOptions);
      } else {
        throw boomify(err as Error, boomOptions);
      }
    }
  };

export default asyncWrapper;
