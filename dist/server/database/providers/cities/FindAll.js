"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = void 0;
const knex_1 = require("../../knex");
const ETableNames_1 = require("../../ETableNames");
const getAll = async (page, limit, filter, id = 0) => {
    try {
        const query = (0, knex_1.Knex)(ETableNames_1.ETableNames.city)
            .select('*')
            .offset((page - 1) * limit)
            .limit(limit);
        if (id > 0) {
            query.where('id', '=', id);
        }
        else if (filter) {
            query.where('name', 'like', `%${filter}%`);
        }
        const result = await query;
        if (id > 0 && result.every(item => item.id !== id)) {
            const resultById = await (0, knex_1.Knex)(ETableNames_1.ETableNames.city)
                .select('*')
                .where('id', '=', id)
                .first();
            if (resultById)
                return [...result, resultById];
        }
        return result;
    }
    catch (error) {
        console.error(error);
        return new Error('Error in get all cities');
    }
};
exports.getAll = getAll;
