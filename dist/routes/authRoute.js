"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const express_1 = require("express");
const authController_1 = require("../controller/authController");
class AuthRoute {
    constructor() {
        this.path = '/';
        this.router = (0, express_1.Router)();
        this.auth = new authController_1.AuthController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}signup`, this.auth.signup);
        // this.router.post(`${this.path}signup`, this.auth.signup);
        console.log('hey man...');
    }
}
exports.AuthRoute = AuthRoute;
// const router = express.Router();
// router.route('/register').post(async (req: Request, res: Response, next: NextFunction) => {
//     const {name, email, password} = req.body;
//    try {
//     if(!name || !email || !password){
//         throw new Error("All inputs are required. pleae enter")
//     }
//     const user = await userModel.create({
//         name,
//         email,
//         password
//     })
//     console.log(user)
//    } catch (error) {
//     console.error(error)
//    }
// });
// router.route('/login').post( (req: Request, res: Response, next: NextFunction) => {
//     res.send('login');
// })
// router.route('/logout').post( (req: Request, res: Response, next: NextFunction) => {
//     res.send('logout');
// })
// export default router;
