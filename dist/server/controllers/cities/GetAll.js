"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = exports.getAllValidation = void 0;
const http_status_codes_1 = require("http-status-codes");
const Validation_1 = require("../../shared/middleware/Validation");
const yup = __importStar(require("yup"));
exports.getAllValidation = (0, Validation_1.validation)(getSchema => ({
    query: getSchema(yup.object().shape({
        page: yup.number().optional().moreThan(0, 'Page must be greater than 0'),
        limit: yup
            .number()
            .optional()
            .moreThan(0, 'Limit must be greater than 0'),
        filter: yup.string().optional(),
    })),
}));
const getAll = async (req, res) => {
    console.log(req.query);
    res
        .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
        .send('Not implement yet get all');
    return;
};
exports.getAll = getAll;
