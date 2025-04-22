"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middleware/auth");
const user_constant_1 = require("../User/user.constant");
const validateRequestSchema_1 = require("../../middleware/validateRequestSchema");
const transaction_validation_1 = require("./transaction.validation");
const transaction_controller_1 = require("./transaction.controller");
const router = express_1.default.Router();
// create transaction
router.post('/', (0, auth_1.auth)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), (0, validateRequestSchema_1.validateRequestSchema)(transaction_validation_1.TransactionValidationSchema.createTransactionValidationSchema), transaction_controller_1.TransactionControllers.createTransactionController);
// update transaction status by id
router.patch('/:id/status', (0, auth_1.auth)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), transaction_controller_1.TransactionControllers.updateTransactionStatusByIdController);
// Get purchases history by particular user
router.get('/purchases-history', (0, auth_1.auth)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), transaction_controller_1.TransactionControllers.getPurchasesHistoryByParticularUserController);
// Get sales history by particular user
router.get('/sales-history', (0, auth_1.auth)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), transaction_controller_1.TransactionControllers.getSalesHistoryByParticularUserController);
exports.TransactionRoutes = router;
