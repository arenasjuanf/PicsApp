"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const post_routes_1 = __importDefault(require("./routes/post.routes"));
const server = new server_1.default();
//server.app.use( bodyParser.json())
//server.app.use( bodyParser.urlencoded({ extended: true }))
// File Upload
server.app.use((0, express_fileupload_1.default)());
// App routes
server.app.use('/user', users_routes_1.default);
server.app.use('/post', post_routes_1.default);
// DB Connect
mongoose_1.default.connect("mongodb://localhost:27017/picsApp", { autoCreate: true, autoIndex: true }, (err) => {
    if (err)
        throw err;
    console.log("DB Online");
});
server.start(() => console.log(`...running on port: ${server.port} ....`));
