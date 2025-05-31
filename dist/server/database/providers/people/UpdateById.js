"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateById = void 0;
const knex_1 = require("../../knex");
const ETableNames_1 = require("../../ETableNames");
const updateById = async (id, person) => {
    try {
        const [{ count }] = await (0, knex_1.Knex)(ETableNames_1.ETableNames.person)
            .where('id', '=', id)
            .count('* as count');
        if (count === 0) {
            return new Error('A city used by register was not found');
        }
        const result = await (0, knex_1.Knex)(ETableNames_1.ETableNames.person)
            .update(person)
            .where('id', '=', id);
        if (result > 0)
            return;
        return new Error('Error when trying update person by id');
    }
    catch (error) {
        console.error(error);
        return new Error('Error in update person by id');
    }
};
exports.updateById = updateById;
