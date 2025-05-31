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
exports.signIn = exports.signInValidation = void 0;
const http_status_codes_1 = require("http-status-codes");
const yup = __importStar(require("yup"));
const middleware_1 = require("../../shared/middleware");
const users_1 = require("../../database/providers/users");
const services_1 = require("../../shared/services");
exports.signInValidation = (0, middleware_1.validation)(get => ({
    body: get(yup.object().shape({
        email: yup.string().required().email(),
        password: yup.string().required('Password is required'),
    })),
}));
const signIn = async (req, res) => {
    const { email, password } = req.body;
    const user = await users_1.UserProviders.getByEmail(email);
    if (user instanceof Error) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email or password wrong ',
            },
        });
        return;
    }
    const passwordMatch = await services_1.PasswordCrypto.verifyPassword(password, user.password);
    if (!passwordMatch) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email or password wrong',
            },
        });
    }
    else {
        const accessToken = services_1.JWTService.sign({ uid: user.id });
        if (accessToken === 'JWT_SECRET_NOT_FOUND') {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: {
                    default: 'Error generation accesses token',
                },
            });
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({ accessToken });
        return;
    }
};
exports.signIn = signIn;
