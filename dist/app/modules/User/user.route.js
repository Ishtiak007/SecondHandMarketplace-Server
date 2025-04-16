"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middleware/auth");
const user_constant_1 = require("./user.constant");
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
// Get all users
router.get('/', (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), user_controller_1.UserControllers.getAllUsersController);
exports.UserRoutes = router;
