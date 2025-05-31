"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByEmail = void 0;
const knex_1 = require("../../knex");
const ETableNames_1 = require("../../ETableNames");
const getByEmail = async (email) => {
    try {
        const result = await (0, knex_1.Knex)(ETableNames_1.ETableNames.user)
            .select('*')
            .where('email', email)
            .first();
        if (result)
            return result;
        return new Error('Email was not found');
    }
    catch (error) {
        console.error(error);
        return new Error('Error in get person by id');
    }
};
exports.getByEmail = getByEmail;
