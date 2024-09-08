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
const db_1 = require("../../utils/db");
const users_services_1 = require("./users.services");
const middlewares_1 = require("../../middlewares");
const app = express_1.default.Router();
// get all users
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield db_1.prisma.user.findMany();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
// get single user with id
app.get("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_1.prisma.user.findUnique({
            where: {
                id: String(req.params.id),
            },
        });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
// create user
app.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_1.prisma.user.create({
            data: {
                id: req.body.id,
                name: req.body.name,
                email: req.body.email,
                refreshTokens: req.body.refreshTokens,
                password: req.body.password,
                createdAt: req.body.createdAt,
                updatedAt: req.body.updatedAt,
            },
        });
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
// update an existing user
app.put("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_1.prisma.user.update({
            where: {
                id: String(req.params.id),
            },
            data: {
                name: req.body.name,
                email: req.body.email,
            },
        });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
// delete user
app.delete("/user/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_1.prisma.user.delete({
            where: {
                id: String(req.params.id),
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
app.get("/profile", middlewares_1.isAuthenticated, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.headers["payload"];
        let user;
        if (typeof userId === "string") {
            user = yield (0, users_services_1.findUserById)(userId);
        }
        if (typeof userId === "object") {
            user = yield (0, users_services_1.findUserById)(userId[0]);
        }
        else {
            throw new Error("User data is undefined");
        }
        //delete password to prevent it being sent in the response
        if (user) {
            const userWithoutPassword = {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            };
            res.json(userWithoutPassword);
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
        // delete user.password;
        res.json(user);
    }
    catch (err) {
        next(err);
    }
}));
exports.default = app;
