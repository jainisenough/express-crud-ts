import { Stats } from "node:fs";
import { readdir as fsReaddir, stat as fsStat } from "node:fs/promises";
import { join as pathJoin } from "node:path";
import logger from "../utils/logger";

const router = async () => {
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

  const routerArray = await Promise.all(
    baseDirs.map(async (baseDir) => {
      const route = await import(`./${baseDir}`);
      return route.default;
    })
  );

  return routerArray;
};

export default router;
