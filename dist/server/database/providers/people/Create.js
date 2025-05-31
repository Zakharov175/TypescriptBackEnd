"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const knex_1 = require("../../knex");
const ETableNames_1 = require("../../ETableNames");
const create = async (person) => {
    try {
        const [{ count }] = await (0, knex_1.Knex)(ETableNames_1.ETableNames.city)
            .where('id', '=', person.cityId)
            .count('* as count');
        if (count === 0) {
            return new Error('The city used in register was not found');
        }
        const [result] = await (0, knex_1.Knex)(ETableNames_1.ETableNames.person)
            .insert(person)
            .returning('id');
        if (typeof result === 'object') {
            return result.id;
        }
        else if (typeof result === 'number') {
            return result;
        }
        return new Error('Error when trying create person');
    }
    catch (error) {
        console.error(error);
        return Error('Error in create person');
    }
};
exports.create = create;
