"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const http_status_codes_1 = require("http-status-codes");
const validation = getAllSchemas => async (req, res, next) => {
    const schemas = getAllSchemas(schema => schema);
    const errorsResult = {};
    Object.entries(schemas).forEach(([key, schema]) => {
        try {
            schema.validateSync(req[key], { abortEarly: false });
        }
        catch (err) {
            const yupError = err;
            const errors = {};
            yupError.inner.forEach(error => {
                if (error.path === undefined)
                    return;
                errors[error.path] = error.message;
            });
            errorsResult[key] = errors;
        }
    });
    if (Object.entries(errorsResult).length === 0) {
        next();
        return;
    }
    else {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ errors: errorsResult });
        return;
    }
};
exports.validation = validation;
