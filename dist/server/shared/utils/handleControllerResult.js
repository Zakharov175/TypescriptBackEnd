"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleControllerResult = void 0;
const http_status_codes_1 = require("http-status-codes");
const handleControllerResult = (result, res, successStatus, count) => {
    if (result instanceof Error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        });
        return true;
    }
    if (count instanceof Error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: count.message,
            },
        });
        return true;
    }
    if (successStatus === http_status_codes_1.StatusCodes.NO_CONTENT) {
        res.status(http_status_codes_1.StatusCodes.NO_CONTENT).send();
        return false;
    }
    if (typeof count === 'number') {
        res.setHeader('access-control-expose-headers', 'x-total-count');
        res.setHeader('x-total-count', count);
        res.status(successStatus).json({ data: result, total: count });
    }
    else {
        res.status(successStatus).json(result);
    }
    return false;
};
exports.handleControllerResult = handleControllerResult;
