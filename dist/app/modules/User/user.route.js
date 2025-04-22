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
// Get me
router.get('/me', (0, auth_1.auth)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), user_controller_1.UserControllers.getMeController);
// Get user By ID
router.get('/:id', (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), user_controller_1.UserControllers.getUserControllerById);
// Update user profile
router.patch('/update-profile', (0, auth_1.auth)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), user_controller_1.UserControllers.updateUserController);
// Update User status by id
router.patch('/:id/status', (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), user_controller_1.UserControllers.updateUserStatusByIdController);
// Update User role by id
router.patch('/:id/role', (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), user_controller_1.UserControllers.updateUserRoleByIdController);
// Delete a user
router.delete('/:id', (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), user_controller_1.UserControllers.deleteUserControllerById);
exports.UserRoutes = router;
