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
const prisma_1 = require("../generated/prisma");
const express_1 = __importDefault(require("express"));
const client = new prisma_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/signup", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.body.username;
        const password = req.body.password;
        try {
            yield client.user.create({
                data: {
                    username: username,
                    password: password,
                },
            });
            res.json({ msg: "Signed Up !" });
        }
        catch (error) {
            res.json({ msg: "Error signing up!" });
            console.log(error);
        }
    });
});
app.get("/user", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield client.user.findMany({
                select: { username: true },
            });
            res.json({ users: users });
        }
        catch (error) {
            console.log(error);
        }
    });
});
app.get("/todo/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.params.id;
        try {
            const user = yield client.user.findFirst({
                where: {
                    id: parseInt(userId),
                },
                select: {
                    username: true,
                    todos: true,
                },
            });
            res.json({ user });
        }
        catch (error) {
            console.log(error);
        }
    });
});
app.listen(3000);
