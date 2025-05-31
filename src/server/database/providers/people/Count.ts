import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';

export const count = async (filter: string = ''): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.person)
      .where('completeName', 'like', `%${filter}`)
      .count<[{ count: number }]>('* as count');
    if (Number.isInteger(Number(count))) return Number(count);
    return new Error('Error when trying get total of people');
  } catch (error) {
    console.error(error);
    return new Error('Error in count people');
  }
};
