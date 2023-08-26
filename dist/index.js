"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const authRoute_1 = require("./routes/authRoute");
const server_1 = __importDefault(require("./server"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const PORT = 5000 || process.env.PORT;
// const app = express();
// // parsing request body and parameters
// app.use(express.json());
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
//  connectDB();
// app.use('/api/auth', authRoute)
// app.post('/', (req, res) => {
//   console.log(req.body);
// });
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
class App {
    constructor(routes) {
        this.app = (0, express_1.default)();
        this.env = process.env.NODE_ENV || 'development';
        this.PORT = PORT || 5000;
        this.connectToDB();
        this.initialiseMiddleware();
        this.initialiseRouter(routes);
        this.intializeErrorMiddleware();
        // this.listen();
    }
    connectToDB() {
        (0, server_1.default)();
    }
    initialiseRouter(routes) {
        routes.forEach(route => {
            this.app.use(route.path, route.router);
        });
    }
    initialiseMiddleware() {
        this.app.use(express_1.default.json());
    }
    listen() {
        this.app.listen(this.PORT, () => {
            console.log(`Server running on port ${this.PORT}`);
        });
    }
    intializeErrorMiddleware() {
        this.app.use(errorMiddleware_1.ErrorMIddleware);
    }
}
const app = new App([new authRoute_1.AuthRoute()]);
app.listen();
