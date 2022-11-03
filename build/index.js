"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        //middelwares
        this.app.use((0, morgan_1.default)('common'));
        this.app.use((0, helmet_1.default)());
    }
    routes() {
        this.app.get('/', (req, res) => {
            res.json({ message: 'Hello World' });
        });
        this.app.post('/', (req, res) => {
            res.json({ message: 'Hello World', data: req.body });
        });
    }
    //start app
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on Port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
exports.default = server;
