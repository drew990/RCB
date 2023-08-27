import { CoreModel } from '@/services/SquareService';

export const staleModelTime = 300000;

export const isModelStale = <T extends CoreModel>(model?: T) => {
  return (
    (model?.fetchedAt ?? -staleModelTime - 1) < Date.now() - staleModelTime
  );
};

export const mapData = <K extends string, T extends { [key in K]: string }>(
  primaryKey: K,
  data: T[]
): { [key: string]: T } => {
  const map: { [key: string]: T } = {};

  return data.reduce(
    (map, item) => Object.assign(map, { [item[primaryKey]]: item }),
    map
  );
};
