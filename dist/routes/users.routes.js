"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../classes/token"));
const auth_1 = require("../middlewares/auth");
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
//Login
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
            const { name, avatar, email, _id } = userDB;
            const userToken = token_1.default.getJwtToken({
                name,
                avatar,
                email,
                _id
            });
            res.json({
                ok: true,
                msg: "Logged",
                token: userToken
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
//update
userRoutes.put('/update', [auth_1.checkTokenMdw], (req, res) => {
    const { _id } = req.user;
    user_model_1.User.findByIdAndUpdate(_id, Object.assign({}, req.body), (err, userDB) => {
        if (!err) {
            const { _id, name, email, avatar } = userDB;
            res.json({
                ok: userDB ? true : false,
                msg: userDB ? "user has been updated" : "user not found",
                token: userDB ? token_1.default.getJwtToken({ _id, name, email, avatar }) : ''
            });
        }
        else {
            res.json({
                ok: false,
                error: err
            });
        }
    });
});
exports.default = userRoutes;
