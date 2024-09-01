"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.revokeTokens = exports.deleteRefreshToken = exports.findRefreshTokenById = exports.addRefreshTokenToWhiteList = void 0;
const db_1 = require("../../utils/db");
const hashToken_1 = require("../../utils/hashToken");
const addRefreshTokenToWhiteList = ({ jti, refreshToken, userId }) => {
    return db_1.prisma.refreshToken.create({
        data: {
            id: jti,
            hashedToken: (0, hashToken_1.hashToken)(refreshToken),
            userId,
        },
    });
};
exports.addRefreshTokenToWhiteList = addRefreshTokenToWhiteList;
const findRefreshTokenById = (id) => {
    return db_1.prisma.refreshToken.findUnique({
        where: {
            id,
        },
    });
};
exports.findRefreshTokenById = findRefreshTokenById;
const deleteRefreshToken = (id) => {
    return db_1.prisma.refreshToken.delete({
        where: {
            id,
        },
        data: {
            revoked: true,
        },
    });
};
exports.deleteRefreshToken = deleteRefreshToken;
const revokeTokens = (userId) => {
    return (db_1.prisma.refreshToken.updateMany({
        where: {
            userId,
        },
        data: {
            revoked: true,
        },
    }));
};
exports.revokeTokens = revokeTokens;
