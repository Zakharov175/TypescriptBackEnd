import * as create from './Create';
import * as getAll from './GetAll';
import * as getById from './GetById';
import * as updateById from './UpdateByid';
import * as deleteById from './DeleteById';

export const PeopleController = {
  ...create,
  ...getAll,
  ...getById,
  ...updateById,
  ...deleteById,
};
