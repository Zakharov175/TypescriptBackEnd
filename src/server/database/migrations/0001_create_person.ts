import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export const up = async (knex: Knex) => {
  return knex.schema
    .createTable(ETableNames.person, table => {
      table.bigIncrements('id').primary();
      table.string('completeName').index().notNullable();
      table.string('email').unique().notNullable();
      table
        .bigInteger('cityId')
        .index()
        .notNullable()
        .references('id')
        .inTable(ETableNames.city)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      table.comment('Table used for store system people');
    })
    .then(() => {
      console.log(`Create table ${ETableNames.person}`);
    });
};

export const down = async (knex: Knex) => {
  return knex.schema.dropTable(ETableNames.person).then(() => {
    console.log(`Dropped table ${ETableNames.person}`);
  });
};
