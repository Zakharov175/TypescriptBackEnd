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
exports.updateById = exports.updateByIdValidation = void 0;
const http_status_codes_1 = require("http-status-codes");
const yup = __importStar(require("yup"));
const middleware_1 = require("../../shared/middleware");
const people_1 = require("../../database/providers/people");
const utils_1 = require("../../shared/utils");
exports.updateByIdValidation = (0, middleware_1.validation)(get => ({
    body: get(yup.object().shape({
        email: yup.string().required().email(),
        cityId: yup.number().integer().required(),
        completeName: yup.string().required().min(3),
    })),
    params: get(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));
const updateById = async (req, res) => {
    const { id } = req.params;
    const statusCode = http_status_codes_1.StatusCodes.NO_CONTENT;
    if (!utils_1.UtilsValidation.validateParamId(id, res))
        return;
    const result = await people_1.PeopleProvider.updateById(id, req.body);
    if (!utils_1.UtilsValidation.handleControllerResult(result, res, statusCode)) {
        res.end();
    }
};
exports.updateById = updateById;
