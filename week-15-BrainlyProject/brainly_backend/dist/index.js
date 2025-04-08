"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const zod_1 = __importStar(require("zod"));
const jwt_key = "jwdq00-1-==1";
const bcrypt_1 = __importDefault(require("bcrypt"));
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Attemting to connect");
        yield mongoose_1.default
            .connect("mongodb+srv://stark:stHQvz8kODnms83p@cluster0.kds1g.mongodb.net/Brainly")
            .then(() => {
            console.log("connected");
        })
            .catch((error) => {
            console.log(error);
        });
        app.listen(3003);
    });
}
main();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
}));
app.use(express_1.default.json());
app.post("/api/v1/signup", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const usernameBody = zod_1.default.object({
            username: zod_1.z.string().min(2).max(10),
        });
        const passwordBody = zod_1.default.object({
            password: zod_1.z.string().min(2).max(10),
        });
        const validusername = usernameBody.safeParse(req.body);
        const validpassword = passwordBody.safeParse(req.body);
        if (!validusername) {
            res.json({ msg: "username not valid" });
            return;
        }
        if (!validpassword) {
            res.json({ msg: "password not valid" });
        }
        const username = req.body.username;
        const password = req.body.password;
        const hashpassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield db_1.userModel.findOne({ username: username });
        if (user) {
            res.json({ msg: "Username already exists" });
            return;
        }
        const signup = yield db_1.userModel.create({
            username: username,
            password: hashpassword,
        });
        if (signup) {
            res.json({ msg: "Sign Up Successfull" });
        }
        else {
            res.json({ msg: "Error Signup" });
        }
    });
});
app.post("/api/v1/signin", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.body.username;
        const password = req.body.password;
        const user = yield db_1.userModel.findOne({ username: username });
        if (user) {
            const user_password = user.password;
            if (user_password) {
                const valid = yield bcrypt_1.default.compare(password, user_password);
                if (valid) {
                    const token = jsonwebtoken_1.default.sign({ userId: user._id.toString() }, jwt_key);
                    res.json({ token: token });
                }
                else {
                    res.json({ msg: "Incorrect password" });
                }
            }
        }
        else {
            res.json({ msg: "username not found" });
        }
    });
});
app.post("/api/v1/content", middleware_1.authuser, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        const userid = req.userid;
        const title = req.body.title;
        const link = req.body.link;
        const tags = req.body.tags;
        const type = req.body.type;
        const post_content = yield db_1.contentModel.create({
            title: title,
            type: type,
            link: link,
            tags: tags,
            userid: userid,
        });
        if (post_content) {
            res.json({ msg: "content added !" });
        }
        else {
            res.json({ msg: "Something went wrong !" });
        }
    });
});
app.get("/api/v1/content", middleware_1.authuser, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        const userid = req.userid;
        const contents = yield db_1.contentModel
            .find({ userid: userid })
            .populate("userid", "username");
        if (contents.length != 0) {
            res.json({
                contents,
            });
        }
        else {
            res.json({ msg: "No Content found" });
        }
    });
});
app.delete("/api/v1/content", middleware_1.authuser, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        const userid = req.userid;
        const contentid = req.body.contentid;
        const content = yield db_1.contentModel.findOne({ _id: contentid });
        if (content) {
            yield db_1.contentModel.deleteOne({ _id: contentid });
            res.json({ msg: "Deleted" });
        }
        else {
            res.json({ msg: "No content found" });
        }
    });
});
app.post("/api/v1/share", middleware_1.authuser, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //@ts-ignore
        const userid = req.userid;
        const share = req.body.share;
        if (share) {
            const existingLink = yield db_1.linkModel.findOne({ userid: userid });
            if (existingLink) {
                res.json({ hash: existingLink.hash });
                return;
            }
            const hash = (0, utils_1.random)(10);
            yield db_1.linkModel.create({
                userid: userid,
                hash: hash,
            });
            res.json({
                hash: hash,
            });
        }
        else {
            yield db_1.linkModel.deleteOne({
                userid: userid,
            });
            res.json({ msg: "Link Deleted" });
        }
    });
});
app.get("/api/v1/:sharelink", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const hash = req.params.sharelink;
        const link = yield db_1.linkModel.findOne({ hash: hash });
        if (!link) {
            res.json({ msg: "Incorrect input" });
            return;
        }
        const userid = link.userid;
        const content = yield db_1.contentModel.findOne({ userid: userid });
        const user = yield db_1.userModel.findOne({
            _id: userid,
        });
        if (!user) {
            res.json({ msg: "User Not Found , something went wrong" });
        }
        else {
            res.json({ username: user.username, content: content });
        }
    });
});
