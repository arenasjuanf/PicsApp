"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is Required"]
    },
    avatar: {
        type: String,
        default: 'av-0.png'
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
}, { versionKey: false });
userSchema.method('comparePassword', function (password) {
    return bcrypt_1.default.compareSync(password, this.password) ? true : false;
});
exports.User = (0, mongoose_1.model)('User', userSchema);
