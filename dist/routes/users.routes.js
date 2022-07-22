"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRoutes = (0, express_1.Router)();
//Create user
userRoutes.post('/create', (req, res) => {
    const { body: { name, email, password, avatar } } = req;
    const user = {
        name,
        email,
        password: bcrypt_1.default.hashSync(password, 10),
        avatar: avatar || 'av-0.png'
    };
    user_model_1.User.create(user).then(() => {
        res.json({
            msg: "it works",
            ok: true,
            user
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
userRoutes.post('/login', (req, res) => {
    const { body: { email, password } } = req;
    user_model_1.User.findOne({ email }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB) {
            res.json({
                ok: false,
                msg: "Wrong email or Password"
            });
        }
        if (userDB.comparePassword(password)) {
            res.json({
                ok: true,
                msg: "Logged",
                token: "asfas6fas6f5a6s5f"
            });
        }
        else {
            res.json({
                ok: true,
                msg: "invalid password"
            });
        }
    });
});
exports.default = userRoutes;
