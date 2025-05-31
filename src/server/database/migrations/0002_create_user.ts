import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export const up = async (knex: Knex) => {
  return knex.schema
    .createTable(ETableNames.user, table => {
      table.bigIncrements('id').primary();
      table.string('name').notNullable().checkLength('>', 3);
      table.string('email').unique().notNullable().checkLength('>', 6);
      table.comment('Table used for store users');
      table.string('password').notNullable().checkLength('>', 6);
    })
    .then(() => {
      console.log(`Create table ${ETableNames.user}`);
    });
};

export const down = async (knex: Knex) => {
  return knex.schema.dropTable(ETableNames.user).then(() => {
    console.log(`Dropped table ${ETableNames.user}`);
  });
};
