import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';
import { IUser } from 'server/database/models';

export const getByEmail = async (email: string): Promise<IUser | Error> => {
  try {
    const result = await Knex<IUser>(ETableNames.user)
      .select('*')
      .where('email', email)
      .first();
    if (result) return result;
    return new Error('Email was not found');
  } catch (error) {
    console.error(error);
    return new Error('Error in get person by id');
  }
};
