"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const ETableNames_1 = require("../ETableNames");
const up = async (knex) => {
    return knex.schema
        .createTable(ETableNames_1.ETableNames.person, table => {
        table.bigIncrements('id').primary();
        table.string('completeName').index().notNullable();
        table.string('email').unique().notNullable();
        table
            .bigInteger('cityId')
            .index()
            .notNullable()
            .references('id')
            .inTable(ETableNames_1.ETableNames.city)
            .onUpdate('CASCADE')
            .onDelete('RESTRICT');
        table.comment('Table used for store system people');
    })
        .then(() => {
        console.log(`Create table ${ETableNames_1.ETableNames.person}`);
    });
};
exports.up = up;
const down = async (knex) => {
    return knex.schema.dropTable(ETableNames_1.ETableNames.person).then(() => {
        console.log(`Dropped table ${ETableNames_1.ETableNames.person}`);
    });
};
exports.down = down;
