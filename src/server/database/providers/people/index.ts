import * as create from './Create';
import * as count from './Count';
import * as deleteById from './DeleteById';
import * as getAll from './FindAll';
import * as updateById from './UpdateById';
import * as getById from './GetById';

export const PeopleProvider = {
  ...create,
  ...deleteById,
  ...getById,
  ...count,
  ...getAll,
  ...updateById,
};
