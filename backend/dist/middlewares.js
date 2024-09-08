"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuthenticated = (req, res, next) => {
    const authorization = req.headers["authorization"];
    if (!authorization) {
        res.status(401);
        throw new Error("Unauthorized");
    }
    try {
        let token;
        if (typeof authorization === "string") {
            token = authorization.split(" ")[1];
        }
        else { //assuming that it would be a string[] in the latter case, but come back and fix later
            token = authorization[0].split(" ")[1];
        }
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_SECRET);
        req.headers["payload"] = JSON.stringify(payload); //had to JSON stringify because payload is of type JwtPayload and req.headers accepts string | string[] - come back later
    }
    catch (error) {
        if (error instanceof Error) {
            //type assertion to see if error is correctly of type Error
            res.status(401);
            if (error.name === "TokenExpiredError") {
                return next(new Error(error.name));
            }
            return next(new Error("Unauthorized!"));
        }
        else {
            res.status(500);
            return next(new Error("An unknown error occurred"));
        }
    }
    return next();
};
exports.isAuthenticated = isAuthenticated;
