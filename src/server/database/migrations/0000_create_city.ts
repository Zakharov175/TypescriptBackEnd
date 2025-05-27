import type { Knex } from 'knex';
import { ETableName } from '../ETableNames';

export const up = async (knex: Knex) => {
  return knex.schema
    .createTable(ETableName.city, table => {
      table.bigIncrements('id').primary().index();
      table.string('name', 150).checkLength('<=',150).index().notNullable();
      table.comment('Table used for store system cities');
    })
    .then(() => {
      console.log(`Create table ${ETableName.city}`);
    });
};

export const down = async (knex: Knex) => {
  return knex.schema.dropTable(ETableName.city).then(() => {
    console.log(`Dropped table ${ETableName.city}`);
  });
};
