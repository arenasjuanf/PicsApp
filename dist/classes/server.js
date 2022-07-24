"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("../routes"));
const db_1 = require("./db");
class Server {
    constructor() {
        this.port = 3000;
        this.app = (0, express_1.default)()
            .use((0, cors_1.default)())
            .use(express_1.default.json())
            .use((0, express_fileupload_1.default)({ useTempFiles: true }));
    }
    start(callback) {
        // DB Connect
        const database = new db_1.DB();
        database.connect(() => console.log("DB On"));
        // init routing
        (0, routes_1.default)(this.app);
        this.app.listen(this.port, callback);
    }
}
exports.default = Server;
