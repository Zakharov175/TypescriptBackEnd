"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateById = void 0;
const knex_1 = require("../../knex");
const ETableNames_1 = require("../../ETableNames");
const updateById = async (id, city) => {
    try {
        const result = await (0, knex_1.Knex)(ETableNames_1.ETableNames.city)
            .update(city)
            .where('id', '=', id);
        if (result > 0)
            return;
        return new Error('Error when trying update city by id');
    }
    catch (error) {
        console.error(error);
        return new Error('Error in update city by id');
    }
};
exports.updateById = updateById;
