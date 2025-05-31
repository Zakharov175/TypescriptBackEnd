"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const ETableNames_1 = require("../../ETableNames");
const knex_1 = require("../../knex");
const services_1 = require("../../../shared/services");
const create = async (user) => {
    try {
        const hashedPassword = await services_1.PasswordCrypto.hashPassword(user.password);
        const [result] = await (0, knex_1.Knex)(ETableNames_1.ETableNames.user)
            .insert(Object.assign(Object.assign({}, user), { password: hashedPassword }))
            .returning('id');
        if (typeof result === 'object') {
            return result.id;
        }
        else if (typeof result === 'number') {
            return result;
        }
        return new Error('Error when trying create user');
    }
    catch (error) {
        console.error(error);
        return Error('Error in create user');
    }
};
exports.create = create;
