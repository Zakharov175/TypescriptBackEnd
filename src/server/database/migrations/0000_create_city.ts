import type { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export const up = async (knex: Knex) => {
  return knex.schema
    .createTable(ETableNames.city, table => {
      table.bigIncrements('id').primary();
      table.string('name', 150).checkLength('<=',150).index().notNullable();
      table.comment('Table used for store system cities');
    })
    .then(() => {
      console.log(`Create table ${ETableNames.city}`);
    });
};

export const down = async (knex: Knex) => {
  return knex.schema.dropTable(ETableNames.city).then(() => {
    console.log(`Dropped table ${ETableNames.city}`);
  });
};
