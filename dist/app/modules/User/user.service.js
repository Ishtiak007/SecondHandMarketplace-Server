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
exports.UserServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const HttpError_1 = require("../../errors/HttpError");
const user_model_1 = require("./user.model");
// Get all users
const getAllUsers = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const userQuery = new QueryBuilder_1.default(user_model_1.User.find(), query).sortBy().paginate();
    const meta = yield userQuery.countTotal();
    const result = yield userQuery.modelQuery;
    if (result.length === 0) {
        throw new HttpError_1.HttpError(404, 'User not found. Please check your input.');
    }
    return {
        meta,
        result,
    };
});
// Get me
const getMeFromDB = (identifier) => __awaiter(void 0, void 0, void 0, function* () {
    if (!identifier) {
        throw new Error('A valid identifier is needed to fetch user details.');
    }
    const existingUser = yield user_model_1.User.isUserExists(identifier);
    if (!existingUser) {
        throw new Error('User not found.');
    }
    const user = yield user_model_1.User.findOne({ identifier }).select('-password');
    return user;
});
// Get user By ID
const getUserByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(id);
    if (!user) {
        throw new HttpError_1.HttpError(404, 'No user found with this ID');
    }
    return user;
});
// Update user profile
const updateUserFromDB = (payload, identifier) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExists(identifier);
    if (!user) {
        throw new HttpError_1.HttpError(404, 'This user not found');
    }
    const updatedProfile = yield user_model_1.User.findOneAndUpdate({ identifier: identifier }, payload, { new: true, runValidators: true });
    return updatedProfile;
});
// Update User status by id
const updateUserStatusByIdIntoDB = (id, status, identifier) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExists(identifier);
    if (!user)
        throw new HttpError_1.HttpError(404, 'This user is not found');
    const updatedStatus = yield user_model_1.User.findOneAndUpdate({ _id: id, isDeleted: false }, { status: status }, { runValidators: true, new: true });
    if (!updatedStatus)
        throw new HttpError_1.HttpError(404, 'There is No user found with this ID');
    return updatedStatus;
});
// Update User role by id
const updateUserRoleByIdIntoDB = (id, role, identifier) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExists(identifier);
    if (!user)
        throw new HttpError_1.HttpError(404, 'This user is not found');
    const updatedStatus = yield user_model_1.User.findOneAndUpdate({ _id: id, isDeleted: false }, { role: role }, { runValidators: true, new: true });
    if (!updatedStatus)
        throw new HttpError_1.HttpError(404, 'There is No user found with this ID');
    return updatedStatus;
});
// Delete a user
const deleteUserByIdIntoDB = (id, identifier) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExists(identifier);
    if (!user)
        throw new HttpError_1.HttpError(404, 'This user is not found');
    const deletedUser = yield user_model_1.User.findOneAndUpdate({ _id: id }, { isDeleted: true }, { new: true });
    return deletedUser;
});
exports.UserServices = {
    getAllUsers,
    getMeFromDB,
    getUserByIdFromDB,
    updateUserFromDB,
    updateUserStatusByIdIntoDB,
    updateUserRoleByIdIntoDB,
    deleteUserByIdIntoDB,
};
