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
        console.log("Connected");
    });
}
main();
app.use(express_1.default.json());
app.get("/signup", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;
        const town = req.body.town;
        const pincode = req.body.pincode;
        const state = req.body.state;
        try {
            const query1 = `INSERT INTO users2(username,password,email) VALUES($1, $2, $3) RETURNING id;`;
            const query2 = `INSERT INTO address2(town, pincode, state, userid) VALUES($1, $2, $3, $4);`;
            // wrap the entire query inside a transaction , so that either both the query get success or
            // neither of them get executed so that there is not nay user without address
            yield pgClient.query("BEGIN;");
            const response = yield pgClient.query(query1, [username, password, email]);
            const userid = response.rows[0].id;
            const response2 = yield pgClient.query(query2, [
                town,
                pincode,
                state,
                userid,
            ]);
            yield pgClient.query("COMMIT;");
            res.json({ msg: "Sign Up Succesfull" });
        }
        catch (error) {
            res.json({ msg: "Error Signing Up" });
            console.log(error);
        }
    });
});
app.get("/address", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.body.username;
        try {
            const query = `SELECT u.username , u.email, a.town, a.state, a.pincode FROM users2 u JOIN address2 a ON u.id = a.userid WHERE u.username = $1`;
            const response = yield pgClient.query(query, [username]);
            const data = response.rows;
            console.log(response);
            res.json({ data });
        }
        catch (error) {
            console.log(error);
        }
    });
});
app.listen(3000);
