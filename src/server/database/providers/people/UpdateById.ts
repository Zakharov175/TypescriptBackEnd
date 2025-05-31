import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';
import { IPerson } from '../../models';

export const updateById = async (
  id: number,
  person: Omit<IPerson, 'id'>,
): Promise<void | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.person)
      .where('id', '=', id)
      .count<[{ count: number }]>('* as count');

    if (count === 0) {
      return new Error('A city used by register was not found');
    }
    const result = await Knex(ETableNames.person)
      .update(person)
      .where('id', '=', id);
    if (result > 0) return;
    return new Error('Error when trying update person by id');
  } catch (error) {
    console.error(error);
    return new Error('Error in update person by id');
  }
};
