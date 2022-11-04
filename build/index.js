"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        //middelwares
        this.app.use(express_1.default.json());
        this.app.use((0, morgan_1.default)('common'));
        this.app.use((0, helmet_1.default)());
        this.app.use((0, express_rate_limit_1.default)({
            windowMs: 60 * 1000,
            max: 2,
            standardHeaders: true,
            legacyHeaders: false
        }));
    }
    routes() {
        this.app.get('/', (req, res) => {
            throw new Error('ali error');
            res.json({ message: 'Hello World' });
        });
        this.app.post('/', (req, res) => {
            res.json({ message: 'Hello World', data: req.body });
        });
        this.app.use(error_middleware_1.default);
        this.app.use((_req, res) => {
            res.status(404).json({
                message: 'Ohh you are lost, read the API documentation to find your way back home 😂',
            });
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
