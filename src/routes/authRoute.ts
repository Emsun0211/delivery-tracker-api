import express, {Request, Response, NextFunction, Router} from 'express';
import { userModel } from '../model/userModel';
import { AuthService } from '../services/auth.service';
import { Routes } from '../utils/interfaces';
import { AuthController } from '../controller/authController';



export class AuthRoute implements Routes{
    public path = '/';
    public router = Router();
    private auth = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router.post(`${this.path}signup`, this.auth.signup); 
        // this.router.post(`${this.path}signup`, this.auth.signup);
        console.log('hey man...');
    }

}







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