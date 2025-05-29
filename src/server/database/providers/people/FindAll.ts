import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';
import { IPerson } from '../../models';

export const getAll = async (
  page: number,
  limit: number,
  filter: string,
  id = 0,
): Promise<IPerson[] | Error> => {
  try {
    const query = Knex<IPerson>(ETableNames.person)
      .select('*')
      .offset((page - 1) * limit)
      .limit(limit);
    if (id > 0) {
      query.where('id', '=', id);
    } else if (filter) {
      query.where('completeName', 'like', `%${filter}%`);
    }
    const result = await query;
    if (id > 0 && result.every(item => item.id !== id)) {
      const resultById = await Knex<IPerson>(ETableNames.person)
        .select('*')
        .where('id', '=', id)
        .first();
      if (resultById) return [...result, resultById];
    }
    return result;
  } catch (error) {
    console.error(error);
    return new Error('Error in get all people');
  }
};
