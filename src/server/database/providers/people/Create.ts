import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';
import { IPerson } from 'server/database/models';

export const create = async (
  person: Omit<IPerson, 'id'>,
): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.city)
      .where('id', '=', person.cityId)
      .count<[{ count: number }]>('* as count');

    if (count === 0) {
      return new Error('The city used in register was not found');
    }
    const [result] = await Knex<IPerson>(ETableNames.person)
      .insert(person)
      .returning('id');
    if (typeof result === 'object') {
      return result.id;
    } else if (typeof result === 'number') {
      return result;
    }
    return new Error('Error when trying create person');
  } catch (error) {
    console.error(error);
    return Error('Error in create person');
  }
};
