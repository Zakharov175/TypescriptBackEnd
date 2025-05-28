import * as create from './Create';
import * as deleteById from './DeleteById';
import * as getById from './GetById';
import * as updateById from './UpdateById';
import * as getAll from './FindAll';
import * as count from './Count';

export const CitiesProvider = {
  ...create,
  ...deleteById,
  ...getById,
  ...updateById,
  ...getAll,
  ...count,
};
