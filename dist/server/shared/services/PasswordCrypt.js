"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordCrypto = void 0;
const bcryptjs_1 = require("bcryptjs");
const SALT_RANDOMS = 8;
const hashPassword = async (password) => {
    const saltGenerated = await (0, bcryptjs_1.genSalt)(SALT_RANDOMS);
    return await (0, bcryptjs_1.hash)(password, saltGenerated);
};
const verifyPassword = async (password, hashedPassword) => {
    return await (0, bcryptjs_1.compare)(password, hashedPassword);
};
exports.PasswordCrypto = {
    hashPassword,
    verifyPassword,
};
