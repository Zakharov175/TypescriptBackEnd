import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';
import { IPerson } from '../../models';

export const getById = async (id: number): Promise<IPerson | Error> => {
  try {
    const result = await Knex<IPerson>(ETableNames.person)
      .select('*')
      .where('id', '=', id)
      .first();
    if (result) return result;
    return new Error('Id was not found');
  } catch (error) {
    console.error(error);
    return new Error('Error in get person by id');
  }
};
