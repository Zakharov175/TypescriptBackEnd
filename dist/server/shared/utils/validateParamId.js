"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParamId = void 0;
const http_status_codes_1 = require("http-status-codes");
const validateParamId = (id, res) => {
    const numericId = Number(id);
    if (!numericId || isNaN(numericId) || numericId <= 0) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'The field id was not found or invalid',
            },
        });
        return false;
    }
    return true;
};
exports.validateParamId = validateParamId;
