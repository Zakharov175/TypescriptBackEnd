"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const ETableNames_1 = require("../ETableNames");
const up = async (knex) => {
    return knex.schema
        .createTable(ETableNames_1.ETableNames.user, table => {
        table.bigIncrements('id').primary();
        table.string('name').notNullable().checkLength('>', 3);
        table.string('email').unique().notNullable().checkLength('>', 6);
        table.comment('Table used for store users');
        table.string('password').notNullable().checkLength('>', 6);
    })
        .then(() => {
        console.log(`Create table ${ETableNames_1.ETableNames.user}`);
    });
};
exports.up = up;
const down = async (knex) => {
    return knex.schema.dropTable(ETableNames_1.ETableNames.user).then(() => {
        console.log(`Dropped table ${ETableNames_1.ETableNames.user}`);
    });
};
exports.down = down;
