"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = require("./app/middleware/globalErrorHandler");
const notFound_1 = __importDefault(require("./app/middleware/notFound"));
const app = (0, express_1.default)();
// parser
app.use(express_1.default.json());
// app.use(cors());
app.use((0, cookie_parser_1.default)());
// app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));
app.use((0, cors_1.default)({
    origin: ['https://second-hand-marketplace-client-seven.vercel.app'],
    credentials: true,
}));
// application routes
app.use('/api/v1', routes_1.default);
// check server health
app.get('/', (req, res) => {
    res.send('SecondHandMarketplace Assignment Server is Running');
});
// global error handler
app.use(globalErrorHandler_1.globalErrorHandler);
// not found handler
app.use(notFound_1.default);
exports.default = app;
