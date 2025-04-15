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
const pg_1 = require("pg");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const pgClient = new pg_1.Client("postgresql://neondb_owner:npg_cjUFCitemh42@ep-yellow-river-a55naqz5-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield pgClient.connect();
        console.log("Comnnected to Server");
    });
}
main();
app.use(express_1.default.json());
app.get("/signup", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;
        try {
            // we use this below syntax to protect our database from sql injection
            const query = `INSERT INTO users(username, password, email) VALUES ($1 , $2, $3)`;
            const response = yield pgClient.query(query, [username, password, email]);
            console.log(response);
            res.json({ msg: "Signed UP !" });
        }
        catch (error) {
            console.log(error);
            res.json({ msg: "Error Signing Up" });
        }
    });
});
app.listen(3000);
