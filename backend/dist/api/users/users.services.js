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
exports.findUserById = exports.createUser = exports.findUserByEmail = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../../utils/db");
const findUserByEmail = (email) => {
    return db_1.prisma.user.findUnique({
        where: {
            email,
        },
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
const findUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.prisma.user.findUnique({
        where: {
            id,
        },
    });
    if (user === null) {
        throw new Error("No info regarding this user");
    }
    else {
        return user;
    }
});
exports.findUserById = findUserById;
