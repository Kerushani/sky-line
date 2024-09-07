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
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashToken_1 = require("../../utils/hashToken");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
router.post("/register", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name } = req.body;
        if (!email || !password || !name) {
            res.status(400);
            throw new Error("Please provide an email, name, and password");
        }
        const existingUser = yield (0, users_services_1.findUserByEmail)(email);
        if (existingUser) {
            res.status(400);
            throw new Error("Email already in use");
        }
        const user = yield (0, users_services_1.createUser)({
            email,
            password,
            id: (0, uuid_1.v4)(),
            name,
            createdAt: new Date(),
            updatedAt: new Date(),
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
router.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400);
            throw new Error("You must provide an email and a password.");
        }
        const existingUser = yield (0, users_services_1.findUserByEmail)(email);
        if (!existingUser) {
            res.status(403);
            throw new Error("Invalid login credentials.");
        }
        const validPassword = yield bcrypt_1.default.compare(password, existingUser.password);
        if (!validPassword) {
            res.status(403);
            throw new Error("Invalid login credentials.");
        }
        const jti = (0, uuid_1.v4)();
        const { accessToken, refreshToken } = (0, jwt_1.generateTokens)(existingUser, jti);
        yield (0, auth_services_1.addRefreshTokenToWhiteList)({
            jti,
            refreshToken,
            userId: existingUser.id,
        });
        res.json({
            accessToken,
            refreshToken,
        });
    }
    catch (err) {
        next(err);
    }
}));
router.post("/refreshToken", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            res.status(400);
            throw new Error("Refresh token is missing");
        }
        const payload = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const savedRefreshToken = yield (0, auth_services_1.findRefreshTokenById)(payload.jti);
        //if user does not have a refresh token
        if (!savedRefreshToken || savedRefreshToken.revoked === true) {
            res.status(401);
            throw new Error("Unauthorized");
        }
        //case where hashToken might have been tampered with
        const hashedToken = (0, hashToken_1.hashToken)(refreshToken);
        if (hashedToken !== savedRefreshToken.hashedToken) {
            res.status(401);
            throw new Error("Unauthorized");
        }
        const user = yield (0, users_services_1.findUserById)(payload.userId);
        if (!user) {
            res.status(401);
            throw new Error("Unauthorized");
        }
        yield (0, auth_services_1.deleteRefreshToken)(savedRefreshToken.id);
        const jti = (0, uuid_1.v4)();
        const { accessToken, refreshToken: newRefreshToken } = (0, jwt_1.generateTokens)(user, jti);
        yield (0, auth_services_1.addRefreshTokenToWhiteList)({ jti, refreshToken: newRefreshToken, userId: user.id });
        res.json({
            accessToken,
            refreshToken: newRefreshToken
        });
    }
    catch (error) {
        next(error);
    }
}));
//use for password reset - don't let refreshtoken be exposed in the api
router.post("/revokeRefreshToken", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        yield (0, auth_services_1.revokeTokens)(userId);
        res.json({ message: `User with id ${userId} has their tokens revoked. Please try logging in again.` });
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
