import { Knex } from '../../knex';
import { ETableName } from '../../ETableNames';
import { ICity } from '../../models';

export const getAll = async (
  page: number,
  limit: number,
  filter: string,
  id = 0,
): Promise<ICity[] | Error> => {
  try {
    const query = Knex(ETableName.city)
      .select('*')
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0) {
      query.where('id', '=', id);
    } else if (filter) {
      query.where('name', 'like', `%${filter}%`);
    }
    const result = await query;
    if (id > 0 && result.every(item => item.id !== id)) {
      const resultById = await Knex(ETableName.city)
        .select('*')
        .where('id', '=', id)
        .first();
      if (resultById) return [...result, resultById];
    }
    return result;
  } catch (error) {
    console.error(error);
    return new Error('Error in get ALl cities');
  }
};
