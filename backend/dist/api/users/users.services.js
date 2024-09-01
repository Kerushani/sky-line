"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserById = exports.createUser = exports.findUserByEmail = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../../utils/db");
const findUserByEmail = (email) => {
    return db_1.prisma.user.findUnique({
        where: {
            email,
        }
    });
};
exports.findUserByEmail = findUserByEmail;
const createUser = (user) => {
    user.password = bcrypt_1.default.hashSync(user.password, 12);
    return db_1.prisma.user.create({
        data: user,
    });
};
exports.createUser = createUser;
const findUserById = (id) => {
    return db_1.prisma.user.findUnique({
        where: {
            id,
        }
    });
};
exports.findUserById = findUserById;
