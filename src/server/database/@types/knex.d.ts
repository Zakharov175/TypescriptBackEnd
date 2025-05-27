export {ICity} from '../models/City'

declare module 'knex/types/tables';
interface Tables {
  cities: ICity;
  person: IPerson;
  user: IUser;
}
