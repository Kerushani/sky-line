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
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const jwt_1 = require("../../utils/jwt");
const users_services_1 = require("../users/users.services");
const auth_services_1 = require("./auth.services");
const router = express_1.default.Router();
router.post("/register", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400);
            throw new Error("Please provide an email and password");
        }
        const existingUser = yield (0, users_services_1.findUserByEmail)(email);
        if (existingUser) {
            res.status(400);
            throw new Error("Email already in use");
        }
        const user = yield (0, users_services_1.createUser)({
            email,
            password,
            id: "",
            name: "",
            createdAt: new Date,
            updatedAt: new Date,
        });
        const jti = (0, uuid_1.v4)();
        const { accessToken, refreshToken } = (0, jwt_1.generateTokens)(user, jti);
        yield (0, auth_services_1.addRefreshTokenToWhiteList)({ jti, refreshToken, userId: user.id });
        res.json({
            accessToken,
            refreshToken,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
exports.default = router;
