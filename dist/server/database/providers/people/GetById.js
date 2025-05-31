"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getById = void 0;
const knex_1 = require("../../knex");
const ETableNames_1 = require("../../ETableNames");
const getById = async (id) => {
    try {
        const result = await (0, knex_1.Knex)(ETableNames_1.ETableNames.person)
            .select('*')
            .where('id', '=', id)
            .first();
        if (result)
            return result;
        return new Error('Id was not found');
    }
    catch (error) {
        console.error(error);
        return new Error('Error in get person by id');
    }
};
exports.getById = getById;
