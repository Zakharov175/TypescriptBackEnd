"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = void 0;
const knex_1 = require("../../knex");
const ETableNames_1 = require("../../ETableNames");
const deleteById = async (id) => {
    try {
        const result = await (0, knex_1.Knex)(ETableNames_1.ETableNames.person).where('id', '=', id).del();
        if (result > 0)
            return;
        return new Error('Error when trying delete person by id');
    }
    catch (error) {
        console.error(error);
        return new Error('Error in delete city');
    }
};
exports.deleteById = deleteById;
