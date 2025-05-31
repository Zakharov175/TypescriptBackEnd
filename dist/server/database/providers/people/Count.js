"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.count = void 0;
const knex_1 = require("../../knex");
const ETableNames_1 = require("../../ETableNames");
const count = async (filter = '') => {
    try {
        const [{ count }] = await (0, knex_1.Knex)(ETableNames_1.ETableNames.person)
            .where('completeName', 'like', `%${filter}`)
            .count('* as count');
        if (Number.isInteger(Number(count)))
            return Number(count);
        return new Error('Error when trying get total of people');
    }
    catch (error) {
        console.error(error);
        return new Error('Error in count people');
    }
};
exports.count = count;
