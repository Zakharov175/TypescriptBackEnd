"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
const http_status_codes_1 = require("http-status-codes");
const ensureAuthenticated = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'No authenticated',
            },
        });
        return;
    }
    const [type, token] = authorization.split('');
    if (type !== 'Bearer') {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'No authenticated',
            },
        });
        return;
    }
    if (token !== 'test.test.tes') {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'No authenticated',
            },
        });
        return;
    }
    return next();
};
exports.ensureAuthenticated = ensureAuthenticated;
