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
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_1 = require("../middlewares/auth");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const userRoutes = (0, express_1.Router)();
const controller = new user_controller_1.default();
//Create user
userRoutes.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body: { name, email, password, avatar } } = req;
    const user = {
        name,
        email,
        password: bcrypt_1.default.hashSync(password, 10),
        avatar: avatar || 'av-0.png'
    };
    const { response, statusCode } = yield controller.create(user);
    res.status(statusCode).json(response);
}));
//Login
userRoutes.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body: { email, password } } = req;
    const { response, statusCode } = yield controller.login(email, password);
    res.status(statusCode).json(response);
}));
//update
userRoutes.put('/update', [auth_1.checkTokenMdw], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    const { response, statusCode } = yield controller.update(_id, req.body);
    res.status(statusCode).json(response);
}));
userRoutes.get('/', [auth_1.checkTokenMdw], (req, res) => {
    const { response, statusCode } = controller.getInfo(req.user);
    res.status(statusCode).json(response);
});
exports.default = userRoutes;
