"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authuser = authuser;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_key = "jwdq00-1-==1";
function authuser(req, res, next) {
    const token = req.headers["token"];
    const decode = jsonwebtoken_1.default.verify(token, jwt_key);
    if (decode) {
        // @ts-ignore
        req.userid = decode.userId;
        next();
    }
    else {
        res.json({ msg: "You are not signed in !" });
    }
}
