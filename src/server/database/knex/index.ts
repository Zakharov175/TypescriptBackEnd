import { knex } from 'knex';
import { development, production, test } from './Environment';
import 'dotenv/config';

const getEnvironment = () => {
  console.log('Node env = ',process.env.NODE_ENV);
  switch (process.env.NODE_ENV) {
    case 'production':
      return production;
    case 'test':
      return test;

    default:
      return development;
  }
};

export const Knex = knex(getEnvironment());
