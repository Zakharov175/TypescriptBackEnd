import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';
import { ICity } from '../../models';

export const getById = async (id: number): Promise<ICity | Error> => {
  try {
    const result = await Knex<ICity>(ETableNames.city)
      .select('*')
      .where('id', '=', id)
      .first();
    if (result) return result;
    return new Error('Id was not found');
  } catch (error) {
    console.error(error);
    return new Error('Error in get city by id');
  }
};
