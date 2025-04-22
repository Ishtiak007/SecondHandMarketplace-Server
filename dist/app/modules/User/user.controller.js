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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const asyncHandler_1 = require("../../utils/global/asyncHandler");
const sendResponse_1 = require("../../utils/global/sendResponse");
const user_service_1 = require("./user.service");
// Get all users
const getAllUsersController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const users = yield user_service_1.UserServices.getAllUsers(query);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Users are retrieved successfully',
        statusCode: 200,
        data: users,
    });
}));
// Get me
const getMeController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { identifier } = req.user;
    const user = yield user_service_1.UserServices.getMeFromDB(identifier);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'User (me) retrieve successfully',
        statusCode: 200,
        data: user,
    });
}));
// Get user By ID
const getUserControllerById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield user_service_1.UserServices.getUserByIdFromDB(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'User retrieved successfully',
        statusCode: 200,
        data: user,
    });
}));
// Update user profile
const updateUserController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { identifier } = req.user;
    const updatedPayload = req.body;
    const updatedUser = yield user_service_1.UserServices.updateUserFromDB(updatedPayload, identifier);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'User profile update successfully',
        statusCode: 200,
        data: updatedUser,
    });
}));
// Update User status by id
const updateUserStatusByIdController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { identifier } = req.user;
    const { status } = req.body;
    const updatedStatus = yield user_service_1.UserServices.updateUserStatusByIdIntoDB(id, status, identifier);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'User status updated successfully',
        statusCode: 200,
        data: updatedStatus,
    });
}));
// Update User role by id
const updateUserRoleByIdController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { identifier } = req.user;
    const { role } = req.body;
    const updatedRole = yield user_service_1.UserServices.updateUserRoleByIdIntoDB(id, role, identifier);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'User role updated successfully',
        statusCode: 200,
        data: updatedRole,
    });
}));
// Delete a user
const deleteUserControllerById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { identifier } = req.user;
    yield user_service_1.UserServices.deleteUserByIdIntoDB(id, identifier);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'User deleted successfully',
        statusCode: 200,
        data: {},
    });
}));
exports.UserControllers = {
    getAllUsersController,
    getMeController,
    getUserControllerById,
    updateUserController,
    updateUserStatusByIdController,
    updateUserRoleByIdController,
    deleteUserControllerById,
};
