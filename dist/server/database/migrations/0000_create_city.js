"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const ETableNames_1 = require("../ETableNames");
const up = async (knex) => {
    return knex.schema
        .createTable(ETableNames_1.ETableName.city, table => {
        table.bigIncrements('id').primary().index();
        table.string('name', 150).index().notNullable();
        table.comment('Table used for store system cities');
    })
        .then(() => {
        console.log(`Create table ${ETableNames_1.ETableName.city}`);
    });
};
exports.up = up;
const down = async (knex) => {
    return knex.schema.dropTable(ETableNames_1.ETableName.city).then(() => {
        console.log(`Dropped table ${ETableNames_1.ETableName.city}`);
    });
};
exports.down = down;
