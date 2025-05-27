import { Knex } from '../../knex';
import { ETableName } from '../../ETableNames';

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableName.city).where('id', '=', id).del();
    if (result > 0) return;
    return new Error('Error when trying delete city by id');
  } catch (error) {
    console.error(error);
    return new Error('Error in delete city');
  }
};
