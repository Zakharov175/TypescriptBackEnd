"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
const http_status_codes_1 = require("http-status-codes");
const services_1 = require("../services");
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
    const [type, token] = authorization.split(' ');
    if (type !== 'Bearer') {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'No authenticated',
            },
        });
        return;
    }
    const jwtData = services_1.JWTService.verify(token);
    if (jwtData === 'JWT_SECRET_NOT_FOUND') {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'Error verifying token',
            },
        });
        return;
    }
    else if (jwtData === 'INVALID_TOKEN') {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            errors: { default: 'No authenticated' },
        });
    }
    const { uid } = jwtData;
    req.headers.idUser = uid.toString();
    return next();
};
exports.ensureAuthenticated = ensureAuthenticated;
