import {Knex} from '../../knex'
import { ETableNames } from '../../ETableNames';
import { ICity } from 'server/database/models';

export const create = async (
  city: Omit<ICity, 'id'>,
): Promise<number | Error> => {
  try {
  const [result] = await Knex(ETableNames.city).insert(city).returning('id');
    if (typeof result === 'object') {
      return result.id;
    } else if (typeof result === 'number') {
      return result;
    }
    return new Error('Error when trying create city');
  } catch (error) {
    console.error(error);
    return Error('Error in create city ');
  }
};
