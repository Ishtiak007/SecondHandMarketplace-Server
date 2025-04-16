"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const HttpError_1 = require("../errors/HttpError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const asyncHandler_1 = require("../utils/global/asyncHandler");
const user_model_1 = require("../modules/User/user.model");
const auth = (...requiredRoles) => {
    return (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        if (!token) {
            throw new HttpError_1.HttpError(401, 'Access token is missing or invalid. Please provide a valid token to access this resource.');
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        const { identifier, role } = decoded;
        const user = yield user_model_1.User.isUserExists(identifier);
        if (!user) {
            throw new HttpError_1.HttpError(404, 'Your session has expired or your credentials are incorrect. Please log in again.');
        }
        if (user.isDeleted) {
            throw new HttpError_1.HttpError(404, 'The user is already deleted');
        }
        if (user.status === 'banned') {
            throw new HttpError_1.HttpError(403, 'You are no longer able to access this account. Please reach out to support.');
        }
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new HttpError_1.HttpError(403, 'Permission denied. Your current role can’t perform this action.');
        }
        req.user = decoded;
        next();
    }));
};
exports.auth = auth;
