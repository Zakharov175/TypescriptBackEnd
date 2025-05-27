import { Knex } from '../../knex';
import { ETableName } from '../../ETableNames';

export const count = async (filter: ''): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(ETableName.city)
      .where('name', 'like', `%${filter}`)
      .count<[{ count: number }]>('* as count');
    if (Number.isInteger(Number(count))) return Number(count);
    return new Error('Error when trying get total of cities');
  } catch (error) {
    return new Error('Error in count cities')
  }
};
