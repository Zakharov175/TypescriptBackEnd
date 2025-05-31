"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const knex_1 = require("../../knex");
const ETableNames_1 = require("../../ETableNames");
const create = async (city) => {
    try {
        const [result] = await (0, knex_1.Knex)(ETableNames_1.ETableNames.city).insert(city).returning('id');
        if (typeof result === 'object') {
            return result.id;
        }
        else if (typeof result === 'number') {
            return result;
        }
        return new Error('Error when trying create city');
    }
    catch (error) {
        console.error(error);
        return Error('Error in create city ');
    }
};
exports.create = create;
