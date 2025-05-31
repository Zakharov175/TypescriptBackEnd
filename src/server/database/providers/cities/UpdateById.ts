import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';
import { ICity } from '../../models';

export const updateById = async (
  id: number,
  city: Omit<ICity, 'id'>,
): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.city)
      .update(city)
      .where('id', '=', id);
    if (result > 0) return;
    return new Error('Error when trying update city by id');
  } catch (error) {
    console.error(error);
    return new Error('Error in update city by id');
  }
};
